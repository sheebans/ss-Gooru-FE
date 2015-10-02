# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  # All Vagrant configuration is done here. The most common configuration
  # options are documented and commented below. For a complete reference,
  # please see the online documentation at vagrantup.com.

  # Every Vagrant virtual environment requires a box to build off of.
  config.vm.box = "ubuntu/vivid64"

  # Disable automatic box update checking. If you disable this, then
  # boxes will only be checked for updates when the user runs
  # `vagrant box outdated`. This is not recommended.
  # config.vm.box_check_update = false

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  config.vm.network "private_network", ip: "192.168.33.10"

  # config.vm.network "forwarded_port", guest: 4200, host: 4200, auto_correct: true

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  # config.vm.synced_folder "../data", "/vagrant_data"
  #config.vm.synced_folder './', '/var/www/gooru-web'
  config.vm.synced_folder ".", "/vagrant", fsnotify: true,
    exclude: [".vagrant", ".git", "tmp", "node_modules", "bower_components", "dist"]

  #config.vm.synced_folder ".", "/vagrant", type: "rsync",
  #  rsync__exclude: ["tmp/*", "node_modules", "bower_components", ".git/"]

  # Configure the window for gatling to coalesce writes.
  #if Vagrant.has_plugin?("vagrant-gatling-rsync")
  #  config.gatling.latency = 2.5
  #  config.gatling.time_format = "%H:%M:%S"
  #end

  # Automatically sync when machines with rsync folders come up.
  config.gatling.rsync_on_startup = false

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  #
  config.vm.provider "virtualbox" do |vb|
  #   # Don't boot with headless mode
  #   vb.gui = true
  #
  # Use VBoxManage to customize the VM. For example to change memory:
    vb.customize ["modifyvm", :id, "--memory", "1024", "--cpus", 2, "--cpuexecutioncap", "80"]
  end
  #
  # View the documentation for the provider you're using for more
  # information on available options.

  # Enable provisioning with chef solo, specifying a cookbooks path, roles
  # path, and data_bags path (all relative to this Vagrantfile), and adding
  # some recipes and/or roles.
  #

  config.vm.provision "shell", path: "shell-provision.sh"

end
