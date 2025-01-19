resource "azurerm_resource_group" "main" {
    count                 = var.enable_vm ? 1 : 0
    name     = var.prefix
    location = "West US 2"
}

resource "azurerm_virtual_network" "main" {
  count               = var.enable_vm ? 1 : 0
  name                = "${var.prefix}-network"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.main[0].location
  resource_group_name = azurerm_resource_group.main[0].name
}

resource "azurerm_subnet" "internal" {
  count                = var.enable_vm ? 1 : 0
  name                 = "internal"
  resource_group_name  = azurerm_resource_group.main[0].name
  virtual_network_name = azurerm_virtual_network.main[0].name
  address_prefixes     = ["10.0.2.0/24"]
}

resource "azurerm_network_interface" "main" {
  count               = var.enable_vm ? 1 : 0
  name                = "${var.prefix}-vm-nic"
  location            = azurerm_resource_group.main[0].location
  resource_group_name = azurerm_resource_group.main[0].name

  ip_configuration {
    name                          = "${var.prefix}-vm-ip"
    subnet_id                     = azurerm_subnet.internal[0].id
    private_ip_address_allocation = "Dynamic"
  }
}

resource "azurerm_virtual_machine" "main" {
  count = var.enable_vm ? 1 : 0

  name                  = "${var.prefix}-vm"
  location              = azurerm_resource_group.main[0].location
  resource_group_name   = azurerm_resource_group.main[0].name
  network_interface_ids = [azurerm_network_interface.main[0].id]
  vm_size               = "Standard_DS1_v2"

  delete_os_disk_on_termination    = true
  delete_data_disks_on_termination = true

  storage_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-jammy"
    sku       = "22_04-lts"
    version   = "latest"
  }
  storage_os_disk {
    name              = "${var.prefix}-vm-osdisk"
    caching           = "ReadWrite"
    create_option     = "FromImage"
    managed_disk_type = "Standard_LRS"
  }
  os_profile {
    computer_name  = var.computer_name
    admin_username = var.admin_username
    admin_password = var.admin_password
  }

  os_profile_linux_config {
    disable_password_authentication = false
    ssh_keys {
      key_data = file("~/.ssh/id_ed25519.pub")
      path     = "/home/${var.admin_username}/.ssh/authorized_keys"
    }
  }

  tags = var.tags

  lifecycle {
    ignore_changes = [
      tags
    ]
  }
}