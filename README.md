# homelab
ansible-playbook k3s.yml -K

ssh k3s-ops@192.168.1.143

sudo chmod 644 /etc/rancher/k3s/k3s.yaml

sudo cat /etc/rancher/k3s/k3s.yaml

Copy the kube config into ~/.kube/config