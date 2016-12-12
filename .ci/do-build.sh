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
  -e bamboo_buildNumber=${bamboo_buildNumber} \
  -e bamboo_repository_branch_name=${bamboo_repository_branch_name} \
  -w /build \
  node:4.6 .ci/build.sh
