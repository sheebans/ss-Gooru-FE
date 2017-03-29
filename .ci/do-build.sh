#!/bin/bash
##
## Description:
##
## This script invoques the actual build script
## inside a docker container
##
## Author: Julio Arias <julio.arias@edify.cr>

source .ci/common.sh

QUIZZES_VERSION="1.0.0"

if [ -z "$S3_BUCKET" ]; then
  error "No S3 bucket specified."
  exit 1
fi

if [[ -z "$AWS_ACCESS_KEY_ID" ]] || [[ -z "$AWS_SECRET_ACCESS_KEY" ]] || [[ -z "$AWS_DEFAULT_REGION" ]]; then
  error "No AWS credentials provided."
  exit 1
fi

info "Downloading welcome site..."
silent aws s3 cp s3://${S3_BUCKET}/frontend-30/welcome/welcome.tar.gz .

info "Downloading quizzes addon..."
silent aws s3 cp \
  s3://${S3_BUCKET}/quizzes-addon/${QUIZZES_VERSION}/quizzes-addon-${QUIZZES_VERSION}.tgz .

info "Running build inside a custom docker image..."

mkdir /tmp/yarn-cache-bamboo
chmod 0777 /tmp/yarn-cache-bamboo

docker login \
  -u $ARTIFACTORY_USERNAME \
  -p $ARTIFACTORY_PASSWORD edify-dkr.jfrog.io

docker run -t --rm \
  -v $PWD:/build \
  -v /tmp/yarn-cache-bamboo:/tmp/yarn-cache \
  -e bamboo_buildNumber=${bamboo_buildNumber} \
  -e bamboo_repository_branch_name=${bamboo_repository_branch_name} \
  -e QUIZZES_VERSION=${QUIZZES_VERSION} \
  -w /build edify-dkr.jfrog.io/gooru-fe-builder ./.ci/build.sh

