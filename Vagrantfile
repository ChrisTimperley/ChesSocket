Vagrant.configure('2') do |config|

  # Ubuntu Server 12.04 (LTS), 64-bit.
  config.vm.box = 'ubusrv_1204_x64'
  config.vm.box_url = 'http://goo.gl/8kWkm'

  # Forward ports.
  config.vm.network :forwarded_port, guest: 8124, host: 8124

  # Setup a librarian-puppet shell provisioner to automatically
  # install puppet modules upon VM start-up, prior to Puppet.
  #
  # Credit to: https://github.com/mindreframer/vagrant-puppet-librarian
  config.vm.provision :shell, :path => "shell/bootstrap.sh"

  # Enable Puppet (with plugin sync).
  config.vm.provision :puppet do |puppet|
    puppet.manifests_path = 'puppet/manifests'
    puppet.module_path = 'puppet/modules'
    puppet.manifest_file = 'site.pp'
    puppet.options = '--pluginsync'
  end

end