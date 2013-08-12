group { 'puppet': ensure => 'present' }

exec { 'apt-get update':
  command => '/usr/bin/apt-get -y update'
}
package { 'git':
  ensure => 'installed',
  require => Exec['apt-get update']
}

# Install Node.js
class { 'nodejs': }