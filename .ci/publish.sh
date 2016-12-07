#!/bin/bash
##
## Description:
##
## This script publishes the build artifact to an S3 bucket
##
## Author: Julio Arias <julio.arias@edify.cr>

source .ci/common.sh

GIT_BRANCH=${bamboo_planRepository_branch}
BUILD_NUMBER=${bamboo_buildNumber}
VERSION=${GIT_BRANCH}-${BUILD_NUMBER}

if [[ "$GIT_BRANCH" == "GG-Nile" ]]; then

  if [ -z "$S3_BUCKET" ]; then
    error "No S3 bucket specified."
    exit 1
  fi

  if [[ -z "$AWS_ACCESS_KEY_ID" ]] || [[ -z "$AWS_SECRET_ACCESS_KEY" ]] || [[ -z "$AWS_DEFAULT_REGION" ]]; then
    error "No AWS credentials provided."
    exit 1
  fi

  info "Installing AWS cli..."

  curl -s "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"
  unzip awscli-bundle.zip
  ./awscli-bundle/install -b ~/bin/aws

  PATH=~/bin:$PATH

  info "Publishing artifacts..."

  silent aws s3 cp gooru-web-${VERSION}.tar.gz \
    s3://${S3_BUCKET}/${GIT_BRANCH}/gooru-web-$VERSION.tar.gz

  info "Done publishing artifacts"
else
  info "Nothing to publish for branch ${GIT_BRANCH}"
fi
