packer {
  required_plugins {
    proxmox = {
      version = " >= 1.1.6"
      source  = "github.com/hashicorp/proxmox"
    }
  }
}

source "proxmox" "ubuntu" {
  boot_command = [
    "c<wait>",
    "linux /casper/vmlinuz --- only-ubiquity autoinstall net.ifnames=0 biosdevname=0 ip=dhcp ipv6.disable=1 ds=\"nocloud-net;seedfrom=http://{{.HTTPIP}}:{{.HTTPPort}}/\"", // IPv6 disabled to fix hang: https://answers.launchpad.net/ubuntu/+source/ubiquity/+question/698383
    "<enter><wait>",
    "initrd /casper/initrd",
    "<enter><wait>",
    "boot",
    "<enter>"
  ]
  boot_wait = "10s"
  memory    = 4096
  cloud_init = true
  cloud_init_storage_pool = "local-lvm"
  disks {
    disk_size    = "20G"
    storage_pool = "local-lvm"
    format       = "raw"
    type         = "scsi"
  }
  efi_config {
    efi_storage_pool  = "local-lvm"
    efi_type          = "4m"
    pre_enrolled_keys = true
  }

  http_directory           = "http"
  insecure_skip_tls_verify = true
  boot_iso {
    iso_file = "local:iso/ubuntu-24.04.1-live-server-amd64.iso"
  }
  network_adapters {
    bridge = "vmbr0"
    model  = "virtio"
  }
  node                 = "pve"
  password             = "${local.proxmox_password}"
  proxmox_url          = "${local.proxmox_url}"
  ssh_timeout          = "15m"
  ssh_username         = "dev"
  ssh_private_key_file = "~/.ssh/id_ed25519"
  template_description = "Ubuntu 24.04, generated on ${timestamp()}"
  template_name        = "ubuntu-24.04"
  username             = "${local.proxmox_username}"
}

build {
  sources = ["source.proxmox.ubuntu"]

  // Copy the SSH key to the VM
  provisioner "file" {
    source      = "/Users/joshuageissler/.ssh/id_ed25519"
    destination = "~/.ssh/"
  }

  provisioner "shell" {
    inline = [
      "sudo apt-get update"
    ]
  }
}
