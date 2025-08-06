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
docker build -t ghcr.io/jgeissler14/homelab/backend:latest backend/
docker build -t ghcr.io/jgeissler14/homelab/frontend:latest ui/
docker push ghcr.io/jgeissler14/homelab/backend:latest
docker push ghcr.io/jgeissler14/homelab/frontend:latest
```

### GitHub Actions

Container images for the frontend and backend are built automatically and published to GitHub Container Registry on pushes to `main`. The workflow definition lives at `.github/workflows/ghcr-build.yml`.


## FluxCD Deployment

Flux manifests live under `k3s/apps/base/job-platform`. Add `../base/job-platform` to your environment's `kustomization.yaml` (e.g., `k3s/apps/production/kustomization.yaml`) so FluxCD can reconcile and deploy the frontend, backend, and ingress.

