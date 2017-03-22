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

if [ $UID -eq 0 ]; then
  info "Running as root dropping privileges"
  /usr/local/bin/su-exec builder $0
  exit $?
fi

info "Installing quizzes addon..."
silent yarn add file:/quizzes-addon-${QUIZZES_VERSION}.tgz

info "Installing npm dependencies..."
silent yarn install

info "Installing bower dependencies..."
silent bower install

info "Running eslint..."
silent grunt bamboo-eslint

info "Running tests..."
silent grunt bamboo-test

info "Building..."
silent grunt build:prod-bamboo
echo $VERSION > gooru-web/version.html

info "Extracting welcome site into gooru-web"
silent tar xvzf welcome.tar.gz -C gooru-web/

info "Creating artifact with version ${VERSION}..."
tar czf gooru-web-${VERSION}.tar.gz gooru-web/ appspec.yml .deploy/

if [[ "$GIT_BRANCH" =~ hotfix* ]] || \
  [[ "$GIT_BRANCH" =~ release* ]] || \
  [[ "$GIT_BRANCH" == "master" ]] || \
  [[ "$GIT_BRANCH" == "develop" ]] ; then

  info "Building embedded version..."

  rm -rf gooru-web
  GOORU_EMBEDDED=true grunt build:prod-bamboo

  echo $VERSION > gooru-web/version.html

  info "Creating embedded artifact with version ${VERSION}..."

  tar czf gooru-embedded-web-${VERSION}.tar.gz gooru-web/
fi
