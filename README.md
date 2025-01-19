# homelab
Add Desc

## Building
Steps to provision

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

