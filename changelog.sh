#!/bin/bash

if [ "$1" == ""  ] ; then
  echo "Missing release branch. i.e changelog GG-1383"
  exit 1
fi

tickets=( $(git log develop...release/$1 | grep -oEi 'GG-([0-9]+)' | sort -u) )

for i in ${tickets[@]}; do
	echo "https://collaborate.gooru.org/jira/browse/${i}"
done
