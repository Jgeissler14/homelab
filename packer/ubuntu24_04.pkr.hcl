packer {
  required_plugins {
    proxmox = {
      version = " >= 1.1.6"
      source  = "github.com/hashicorp/proxmox"
    }
  }
}

source "proxmox-iso" "ubuntu" {
  boot_command = ["<up><tab> ip=dhcp inst.cmdline inst.ks=http://{{ .HTTPIP }}:{{ .HTTPPort }}/ks.cfg<enter>"]
  boot_wait    = "10s"
  disks {
    disk_size         = "5G"
    storage_pool      = "local-lvm"
    type              = "scsi"
  }
  efi_config {
    efi_storage_pool  = "local-lvm"
    efi_type          = "4m"
    pre_enrolled_keys = true
  }
  # this can be used to host public files for the VM
  # http_directory           = "config"
  insecure_skip_tls_verify = true
  boot_iso {
    iso_file                 = "local:iso/ubuntu-24.04.1-live-server-amd64.iso"
  }
  network_adapters {
    bridge = "vmbr0"
    model  = "virtio"
  }
  node                 = "pve"
  password             = "${local.proxmox_password}"
  proxmox_url          = "${local.proxmox_url}"
  ssh_password         = "${local.proxmox_password}"
  ssh_timeout          = "15m"
  ssh_username         = "${local.proxmox_username}"
  template_description = "Ubuntu 24.04, generated on ${timestamp()}"
  template_name        = "ubuntu-24.04"
  username             = "${local.proxmox_username}"
}

build {
  sources = ["source.proxmox-iso.ubuntu"]

  // Copy the SSH key to the VM
  provisioner "file" {
    source      = "/Users/joshuageissler/.ssh/id_ed25519"
    destination = "~/.ssh/"
  }
}
