#!/bin/bash

echo '-----> Update and Upgrade apt-get'
wget -qO- https://deb.nodesource.com/setup_4.x | sudo bash -
sudo apt-get upgrade -qq -y

echo '-----> Installing nodejs 4.x'
sudo apt-get install nodejs -y -qq

echo '-----> Installing ember-cli'
sudo npm install -g ember-cli@1.13.12 -qq

echo '-----> Installing bower'
sudo npm install -g bower@1.6.5 -qq

echo '-----> Installing phantomjs'
sudo npm install -g phantomjs@1.9.8 -qq
sudo apt-get install libfontconfig -qq -y

echo '-----> Installing stubby'
sudo npm install -g stubby@0.2.13 -qq -y

echo '-----> Installing grunt-cli'
sudo npm install -g grunt-cli@0.1.13 -qq -y

echo '-----> Done'




