import threading
from typing import Dict
from kubernetes import client, watch


def start_job_watcher(job_name: str, namespace: str, store: Dict[str, Dict[str, str]]):
    """Launch a thread to watch a Kubernetes Job and update the provided store."""
    thread = threading.Thread(
        target=_watch_job, args=(job_name, namespace, store), daemon=True
    )
    thread.start()


def _watch_job(job_name: str, namespace: str, store: Dict[str, Dict[str, str]]):
    w = watch.Watch()
    batch_api = client.BatchV1Api()
    for event in w.stream(batch_api.list_namespaced_job, namespace=namespace):
        job = event["object"]
        if job.metadata.name == job_name:
            if job.status.succeeded:
                store[job_name] = {"status": "succeeded"}
                w.stop()
            elif job.status.failed:
                store[job_name] = {"status": "failed"}
                w.stop()
