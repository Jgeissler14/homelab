variable "pm_user" {
  description = "The username for the proxmox user"
  type        = string
  sensitive   = true
}
variable "pm_password" {
  description = "The password for the proxmox user"
  type        = string
  sensitive   = true
}

variable "pm_host" {
  description = "The hostname or IP of the proxmox server"
  type        = string
}

variable "pm_tls_insecure" {
  description = "Set to true to ignore certificate errors"
  type        = bool
  default     = true
}

variable "pm_node_name" {
  description = "name of the proxmox node to create the VMs on"
  type        = string
  default     = "pve"
}

variable "num_masters" {
  description = "Enter the number of Master VMs you want"
  default     = 1
}

variable "num_masters_mem" {
  description = "Enter the value for the amount of RAM for your masters. ie. 4096"
  default     = "4096"
}

variable "num_nodes" {
  description = "Enter the number of VMs you want for worker nodes."
  default     = 1
}

variable "num_nodes_mem" {
  description = "Enter the value for the amount of RAM for your worker nodes. ie. 2048"
  default     = "4096"
}

variable "template_vm_name" {
  description = "Name of the template VM"
  type        = string
  default     = "k3s-master"
}

variable "master_ips" {
  description = "List of ip addresses for master nodes"
  type        = list(string)
  default = [
    "192.168.1.0"
  ]
}

variable "worker_ips" {
  description = "List of ip addresses for worker nodes"
  type        = list(string)
  default = [
    "192.168.1.0"
  ]
}

variable "networkrange" {
  description = "Enter as 8,16,22,24,etc. hint: 10.0.0.0/8"
  default     = 24
}

variable "gateway" {
  description = "Enter your network gateway."
}