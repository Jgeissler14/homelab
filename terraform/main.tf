resource "proxmox_vm_qemu" "core" {
  for_each    = local.vms
  provider    = telmate
  name        = each.key
  desc        = each.value.desc
  target_node = each.value.pve_node


  clone = each.value.template
  # Ensure each VM is cloned in full to avoid
  # dependency to the original VM template
  full_clone = true

  os_type = "cloud-init"

  cores   = each.value.cores
  memory  = each.value.memory
  cpu     = try(each.value.cpu, "host")
  vcpus   = try(each.value.vcpus, 0)
  sockets = try(each.value.sockets, 1)

  # Define a static IP on the primary network interface
  ipconfig0 = "ip=${each.value.dynamic.networks.primary.ip}/24,gw=${local.networks[each.value.dynamic.networks.primary.net].gateway}"
  # ipconfig {
  #   config = "ip=${each.value.dynamic.networks.primary.ip}/24,gw=${local.networks[each.value.dynamic.networks.primary.net].gateway}"
  # }

  dynamic "network" {
    for_each = each.value.dynamic.networks

    content {
      bridge    = local.networks[network.value.net].bridge
      firewall  = network.value.firewall
      link_down = network.value.link_down
      model     = network.value.model
    }
  }
  define_connection_info = true
  # cicustom               = "user=${try(each.value.cloudinit_storage, "ds1618")}:snippets/${each.key}-user-config.yaml,vendor=ds1618:snippets/agent_install-vendor-config.yaml"
  onboot     = try(each.value.autostart, false)
  ciuser     = "dev"
  cipassword = random_password.vm_password.result


  # Enable the QEMU guest agent
  agent = 1

  scsihw = each.value.scsihw

  disk {
    size    = "20G"
    storage = "local-lvm"
    type    = "scsi"
    format  = "raw"
  }

  lifecycle {
    ignore_changes = [
      target_node,
      network,
      clone,
      full_clone,
      qemu_os
    ]
  }
}