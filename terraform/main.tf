resource "proxmox_vm_qemu" "proxmox_vm_master" {
  count       = var.num_masters
  name        = "k3s-master-${count.index+1}"
  target_node = var.pm_node_name
  clone       = var.template_vm_name
  full_clone  = true

  memory = var.num_masters_mem
  cores  = 4

  ipconfig0 = "ip=${var.master_ips[count.index]}/${var.networkrange},gw=${var.gateway}"

  lifecycle {
    ignore_changes = [
      ciuser,
      sshkeys,
      network
    ]
  }
}

resource "proxmox_vm_qemu" "proxmox_vm_workers" {
  count       = var.num_nodes
  name        = "k3s-agent-${count.index+1}"
  target_node = var.pm_node_name
  clone       = var.template_vm_name
  full_clone  = true

  memory = var.num_nodes_mem
  cores  = 4

  ipconfig0 = "ip=${var.worker_ips[count.index]}/${var.networkrange},gw=${var.gateway}"

  lifecycle {
    ignore_changes = [
      ciuser,
      sshkeys,
      network
    ]
  }
}