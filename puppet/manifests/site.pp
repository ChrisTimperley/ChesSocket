# Installs all required packages before starting real
# installation.
class install_requirements {
  
  group { 'puppet': ensure => 'present' }
  exec { 'apt-get update':
    command => '/usr/bin/apt-get -y update'
  }
  package { 'git':
    ensure => 'installed',
    require => Exec['apt-get update']
  }

}

# Main installer class.
class install {

  # Define stages.
  stage { 'requirements':  }

  # Associate classes to stages.
  class { 'install_requirements': stage => 'requirements' }
  
}

include install