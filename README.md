# homelab
A personal infrastructure setup leveraging modern tools and technologies for automation, configuration management, and cluster orchestration. This repository showcases a complete homelab environment featuring:

Ansible: Automated configuration management and provisioning.
Terraform: Infrastructure as Code for building and managing resources.
Packer: Building reusable machine images for deployments.
K3s: Lightweight Kubernetes for orchestrating workloads.
FluxCD: Continuous delivery with GitOps for seamless application updates.
Designed for experimentation, learning, and testing real-world DevOps practices in a self-contained environment.

## Building
Steps to provision

## Secrets
Configure a secrets.yml file in the ansible directory, make sure it is not commited to git by including in .gitignore if you name differently

ansible_become_password: <SUDO PASSWORD>
gh_flux_pat: <GITHUB PERSONAL ACCESS TOKEN>
github_username: <username>
github_repo: <repository>

### Packer
```
cd packer
packer init .
packer build .
```

### Terraform
```
cd terraform
tf init
tf apply
```

### Ansible

ansible-playbook site.yml -i inventory.yml

code ~/.ssh/config if needed


sudo chmod 644 /etc/rancher/k3s/k3s.yaml

sudo cat /etc/rancher/k3s/k3s.yaml

Copy the kube config into ~/.kube/config

