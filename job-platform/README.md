# Job Platform

This directory contains a minimal example of a job execution platform for Kubernetes.

## Backend

Located in `backend/`, it exposes a FastAPI service with endpoints to list job templates, run a job, check status, and fetch logs. Job definitions are rendered from Jinja templates and submitted to the Kubernetes cluster.

### Running locally

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

## Templates

Templates reside in `backend/templates/` and are written in Jinja2.

## UI

The `ui/` directory contains a small React application built with Vite that can submit jobs and poll for status and logs.

```bash
cd ui
npm install
npm run build
```

## Building Images

Example Dockerfiles are provided for the frontend and backend. Build and push images to a registry accessible by your cluster:

```bash
# from job-platform/
docker build -t YOUR_REGISTRY/job-platform-backend:latest backend/
docker build -t YOUR_REGISTRY/job-platform-frontend:latest ui/
docker push YOUR_REGISTRY/job-platform-backend:latest
docker push YOUR_REGISTRY/job-platform-frontend:latest
```

## Deploying to Kubernetes

Manifests under `deploy/` create Deployments, Services, and an Ingress. Update image references and hostnames, then apply:

```bash
kubectl apply -f deploy/
```
