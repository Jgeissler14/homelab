terraform {
  required_providers {
    telmate = {
      source  = "Terraform-For-Proxmox/proxmox"
      version = "0.0.1"
    }
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "4.16.0"
    }
  }
  backend "s3" {
    bucket = "geissler-homelab"
    key    = "state"
    region = "us-east-1"
  }
}

provider "telmate" {
  pm_api_url      = "https://${var.pm_host}:8006/api2/json"
  pm_user         = var.pm_user
  pm_password     = var.pm_password
  pm_tls_insecure = var.pm_tls_insecure
  pm_parallel     = 10
  pm_timeout      = 600
  #  }
}

provider "azurerm" {
  features {}
  tenant_id       = var.tenant_id
  subscription_id = var.subscription_id
}

variable "tenant_id" {
  description = "The Azure Tenant ID"
  default     = "c6ac7581-7e72-4591-955d-fbb8c4dc1295"
}

variable "subscription_id" {
  description = "The Azure Subscription ID"
  default     = "8356492a-5b92-4829-95f0-48abf6418162"
}