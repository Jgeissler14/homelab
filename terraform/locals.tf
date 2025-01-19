locals {
    vms = yamldecode(file("./external/vms.yml"))
    networks = yamldecode(file("./external/network.yml"))
}

resource "random_password" "vm_password" {
  length  = 16
  special = true
}

# terraform output -json vm_passwords
output "vm_passwords" {
  value = {
    for vm in keys(local.vms) : vm => random_password.vm_password[vm].result
  }
  sensitive = true
}