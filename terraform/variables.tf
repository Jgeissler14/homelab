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
  default     = "192.168.0.80"
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

variable "ciuser" {
  description = "The username for the cloud-init user"
  type        = string
  default     = "dev"
}
