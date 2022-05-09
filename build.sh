#!/bin/bash

cd /home/ajal/Documents/code/wobsite_staticcc
staticcc -tsSf -R "BUILDTIME=$(date --rfc-2822)" $@
echo ""
rsync -av --delete --exclude=/data build/ ubuntu@ambylastname.xyz:~/wobsite/content
