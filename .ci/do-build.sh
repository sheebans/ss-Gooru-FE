#!/bin/bash
##
## Description:
##
## This script invoques the actual build script
## inside a docker container
##
## Author: Julio Arias <julio.arias@edify.cr>

source .ci/common.sh

info "Running build inside node:4.6 docker image..."

docker kill builder
docker rm builder
docker run -t \
  --rm \
  --name builder \
  -v ${PWD}:/build \
  -e S3_BUCKET=${S3_BUCKET} \
  -e AWS_DEFAULT_REGION=${AWS_DEFAULT_REGION} \
  -e AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} \
  -e AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} \
  -e bamboo_buildNumber=${bamboo_buildNumber} \
  -e bamboo_repository_branch_name=${bamboo_repository_branch_name} \
  -w /build \
  node:4.6 .ci/build.sh
