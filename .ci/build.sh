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

GIT_BRANCH=$(echo $bamboo_repository_branch_name | sed 's/\//-/')
BUILD_NUMBER=${bamboo_buildNumber}
export VERSION=${GIT_BRANCH}-${BUILD_NUMBER}
export QUIZZES_VERSION=${QUIZZES_VERSION}

#if [ $UID -eq 0 ]; then
 # info "Running as root dropping privileges"
  #/usr/local/bin/su-exec builder $0
  #exit $?
#fi

info "Removing quizzes addon from lock.file..."
silent rm -rf node_modules/quizzes-addon || true
rm -rf /tmp/yarn-cache/npm-quizzes-addon*
silent yarn remove quizzes-addon

info "Installing quizzes addon..."
silent yarn add file:./quizzes-addon-${QUIZZES_VERSION}.tgz

info "Installing npm dependencies..."
silent yarn install

info "Installing bower dependencies..."
silent bower install --allow-root

info "Running eslint..."
silent grunt bamboo-eslint

info "Running tests..."
silent grunt bamboo-test

info "Building..."
silent grunt build:prod-bamboo
echo $VERSION > gooru-web/version.html


info "Creating artifact with version ${VERSION}..."
tar czf gooru-web-${VERSION}.tar.gz gooru-web/ appspec.yml .deploy/

