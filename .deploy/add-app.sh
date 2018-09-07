#!/bin/bash

sudo cp -r /tmp/gooru-web /var/www/

#
# deploy to all localized sites also managed at nginx
# expected that all gooru localized sites are hosted as gooru-* sites
#  e.g: gooru-in, gooru-ae, gooru-jpn
#
for pathname in /var/www/gooru-*/gooru-web; do
   project="$(dirname "$pathname")"

   sudo rm -rf "$project"/gooru-web
   sudo cp -r /tmp/gooru-web "$project"/
done

sudo rm -rf /tmp/gooru-web
