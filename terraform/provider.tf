terraform {
  required_providers {
    telmate = {
      source  = "Terraform-For-Proxmox/proxmox"
      version = "0.0.1"
    }
  }
  backend "s3" {
    bucket = "geissler-homelab"
    key    = "state"
    region = "us-east-1"
  }
}

provider "telmate" {
  pm_api_url      = "http://${var.pm_host}:8006/api2/json"
  pm_user         = var.pm_user
  pm_password     = var.pm_password
  pm_tls_insecure = var.pm_tls_insecure
  pm_parallel     = 1
  pm_timeout      = 600
  #  }
}
