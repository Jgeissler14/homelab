locals {
  vms      = yamldecode(file("./external/vms.yml"))
  networks = yamldecode(file("./external/network.yml"))

  tags = {
    environment = "homelab"
    created_on  = timestamp()
  }
}

resource "random_password" "vm_password" {
  length  = 16
  special = true
}
