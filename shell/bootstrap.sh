#!/bin/sh

##
# SOURCE: https://github.com/mindreframer/vagrant-puppet-librarian
# LICENSE: GPL, Version 3, 29 June 2007
##

# Directory in which librarian-puppet should manage its modules directory
PUPPET_DIR='/vagrant/puppet'

# NB: librarian-puppet might need git installed. If it is not already installed
# in your basebox, this will manually install it at this point using apt or yum
GIT=/usr/bin/git
APT_GET=/usr/bin/apt-get
YUM=/usr/sbin/yum
if [ ! -x $GIT ]; then
    if [ -x $YUM ]; then
        yum -q -y install git
    elif [ -x $APT_GET ]; then
        apt-get -q -y install git
    else
        echo "No package installer available. You may need to install git manually."
    fi
fi

# Use librarian-puppet-maestrodev rather than librarian-puppet.
# Required to fix issue with rc1 versions:
# https://github.com/rodjek/librarian-puppet/issues/70
if [ `gem query --local | grep librarian-puppet | wc -l` -eq 0 ]; then
  gem install librarian-puppet-maestrodev
  cd $PUPPET_DIR && librarian-puppet install --clean
else
  cd $PUPPET_DIR && librarian-puppet update
fi