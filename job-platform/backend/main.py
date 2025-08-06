from fastapi import FastAPI, HTTPException, APIRouter
from jinja2 import Environment, FileSystemLoader
from kubernetes import client, config
from pydantic import BaseModel
from watchers import start_job_watcher
import yaml
import uuid

app = FastAPI()
api = APIRouter(prefix="/api")

# Jinja environment for templates
env = Environment(loader=FileSystemLoader("templates"))

# Initialize Kubernetes client
try:
    config.load_incluster_config()
except Exception:
    config.load_kube_config()

batch_api = client.BatchV1Api()

jobs = {}


@api.get("/jobs")
def list_jobs():
    return {"templates": ["default-job"]}


class JobRequest(BaseModel):
    template: str
    params: dict


@api.post("/jobs/run")
def run_job(req: JobRequest):
    if req.template != "default-job":
        raise HTTPException(status_code=404, detail="template not found")
    template = env.get_template(f"{req.template}.yaml.j2")
    job_name = f"{req.template}-{uuid.uuid4().hex[:6]}"
    rendered = template.render(job_name=job_name, params=req.params)

    # Deserialize YAML to dict and submit as Job
    body = yaml.safe_load(rendered)
    batch_api.create_namespaced_job(namespace="job-platform", body=body)

    # Start watcher thread for this job
    jobs[job_name] = {"status": "submitted"}
    start_job_watcher(job_name, namespace="job-platform", store=jobs)

    return {"job_name": job_name}


@api.get("/jobs/{job_name}/status")
def job_status(job_name: str):
    try:
        job = batch_api.read_namespaced_job(name=job_name, namespace="job-platform")
        if job.status.succeeded:
            return {"status": "Succeeded"}
        elif job.status.failed:
            return {"status": "Failed"}
        else:
            return {"status": "Running"}
    except client.ApiException as e:
        if e.status == 404:
            return {"status": "Not Found"}
        raise HTTPException(status_code=e.status, detail=e.reason)


@api.get("/jobs/{job_name}/logs")
def job_logs(job_name: str):
    core_api = client.CoreV1Api()
    pods = core_api.list_namespaced_pod(
        namespace="job-platform", label_selector=f"job-name={job_name}"
    )
    if not pods.items:
        raise HTTPException(status_code=200, detail="pod not found")
    pod_name = pods.items[0].metadata.name
    log = core_api.read_namespaced_pod_log(name=pod_name, namespace="job-platform")
    return {"log": log}


app.include_router(api)

