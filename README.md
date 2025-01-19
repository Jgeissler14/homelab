# homelab

# TODO
set up packer 
then terraform from packer images
then isntall k3s
then open pg


ansible-playbook k3s.yml -K

ssh k3s-ops@192.168.1.143

code ~/.ssh/config
Host github.com
  AddKeysToAgent yes
  IdentityFile ~/.ssh/id

Host k3s-controller-1
  User k3s-ops
  HostName 192.168.1.169
  IdentityFile ~/.ssh/id

Host k3s-agent-1
  User k3s-ops
  HostName 192.168.1.168
  IdentityFile ~/.ssh/id

sudo chmod 644 /etc/rancher/k3s/k3s.yaml

sudo cat /etc/rancher/k3s/k3s.yaml

Copy the kube config into ~/.kube/config

