group { 'puppet': ensure => 'present' }

# Global command path.
Exec {
  path => ['/bin/', '/sbin/', '/usr/bin/', '/usr/sbin/']
}

exec { 'apt-get update':
  command => 'apt-get -y update'
}
package { 'git':
  ensure => 'installed',
  require => Exec['apt-get update']
}

# Install and configure Redis.
class { 'redis':
  version => '2.6.5',
  #redis_port => '6379',
  #redis_max_memory => '1gb',
  require => Exec['apt-get update']
}

# Install Node.js and install NPM manifest.
package { ['python-software-properties', 'python', 'g++', 'make']:
  ensure => 'latest',
  require => Exec['apt-get update']
}
exec { 'add-node-repo':
  command => 'sh -c "add-apt-repository ppa:chris-lea/node.js; apt-get update"'
}
package { 'nodejs': 
  ensure => 'latest',
  require => Exec['add-node-repo']
}
exec { 'npm install': 
  command => 'sh -c "cd /vagrant/express; npm install"',
  require => [Package['nodejs'], Class['redis']]
}