packer {
  required_plugins {
    proxmox = {
      version = " >= 1.1.6"
      source  = "github.com/hashicorp/proxmox"
    }
  }
}

source "proxmox-iso" "ubuntu" {
  boot_command = [
    "c<wait>",
    "linux /casper/vmlinuz --- only-ubiquity autoinstall net.ifnames=0 biosdevname=0 ip=dhcp ipv6.disable=1 ds=\"nocloud-net;seedfrom=http://{{.HTTPIP}}:{{.HTTPPort}}/\"", // IPv6 disabled to fix hang: https://answers.launchpad.net/ubuntu/+source/ubiquity/+question/698383
    "<enter><wait>",
    "initrd /casper/", // This is weird, but for some reason my proxmox/packer runs will ignore anything after '/casper/'
    "<enter><wait>",   //  so we throw in another enter/wait before typing in just 'initrd'
    "initrd<enter><wait>",
    "boot",
    "<enter>"
  ]  
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

  http_directory           = "http"
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
