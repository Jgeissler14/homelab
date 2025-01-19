variable "enable_vm" {
  description = "Enable VM creation"
  type        = bool
  default     = true
}

variable "computer_name" {
  description = "Name of the computer"
  type        = string
  default     = "homelab"
}

variable "admin_username" {
  description = "Admin username for the VM"
  type        = string
}

variable "admin_password" {
  description = "Admin password for the VM"
  type        = string
  sensitive   = true
}