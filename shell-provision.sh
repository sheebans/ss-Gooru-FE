#!/bin/bash

echo '-----> Update and Upgrade apt-get'
curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -
sudo apt-get upgrade -qq -y

echo '-----> Installing nodejs'
sudo apt-get install nodejs -y -qq

echo '-----> Installing ember-cli'
npm install -g ember-cli -qq

echo '-----> Installing bower'
sudo npm install -g bower -qq

echo '-----> Installing phantomjs'
sudo npm install -g phantomjs -qq
sudo apt-get install libfontconfig -qq -y

echo '-----> Installing stubby'
sudo npm install -g stubby -qq -y

echo '-----> Installing grunt-cli'
sudo npm install -g grunt-cli -qq -y

echo '-----> Done'




