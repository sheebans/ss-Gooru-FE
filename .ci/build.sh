#!/bin/bash
##
## Description:
##
## Actual build script meant to be run inside the node docker container
##
## Tasks:
## - run tests
## - build (normal and embedded)
## - generante artifacts (normal and embedded)
##
## Author: Julio Arias <julio.arias@edify.cr>

source .ci/common.sh

if [ $UID -eq 0 ]; then
  info "Running as root creating builder user and dropping privileges"
  groupadd -r -g 501 builder && useradd -m -r -g builder -u 500 builder
  curl -sL https://github.com/ncopa/su-exec/archive/v0.2.tar.gz | tar xz -C /tmp
  CURDIR=$PWD
  cd /tmp/su-exec-0.2
  silent make
  cd $CURDIR
  /tmp/su-exec-0.2/su-exec builder $0
  exit $?
fi

GIT_BRANCH=$(git rev-parse --abbrev-ref HEAD | sed 's/\//-/')
VERSION=${GIT_BRANCH}-${BUILD_NUMBER}

info "Installing global npm dependencies..."
npm config set prefix '~/.node_modules'
PATH=~/.node_modules/bin:$PATH
PHANTOMJS_CDNURL=http://cnpmjs.org/downloads
silent npm -q install -g \
  ember-cli@2.9.0 \
  bower@1.7.7 \
  phantomjs-prebuilt@2.1.3 \
  stubby@0.2.13 \
  grunt-cli@0.1.13 \
  npm@latest

info "Installing npm dependencies..."
silent npm -q install

info "Installing bower dependencies..."
silent bower install

info "Running tests..."
silent grunt bamboo-test

if [[ "$VERSION" =~ hotfix* ]] || [[ "$VERSION" =~ master* ]] ||\
   [[ "$VERSION" =~ develop* ]] || [[ "$VERSION" =~ release* ]]; then

  info "Building..."
  silent grunt build:prod-bamboo
  echo $VERSION > gooru-web/version.html

  info "Creating artifact..."
  tar czf gooru-web-$VERSION.tar.gz gooru-web/

  info "Building embedded..."
  rm -rf gooru-web
  GOORU_EMBEDDED=true grunt build:prod-bamboo
  echo $VERSION > gooru-web/version.html

  info "Creating embedded artifact..."
  tar czf gooru-embedded-web-$VERSION.tar.gz gooru-web/
fi
