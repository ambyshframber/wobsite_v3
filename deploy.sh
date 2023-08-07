#!/bin/bash

# check server is online and unencrypt key if it's not been done yet
ssh ubuntu@ambylastname.xyz > /dev/null <<EOF || exit
EOF

cd /home/ajal/Documents/code/wobsite_staticcc

time staticcc -tsSf -R "BUILDTIME=$(date --rfc-2822)"

echo -e "\nsyncing main site..."
rsync -av --delete --exclude=/data --exclude=/magpie build/ ubuntu@ambylastname.xyz:~/wobsite/content

echo -e "\nbuilding gem site..."
gemini/gem_build.py
echo -e "\nsyncing gemini site..."
rsync -av --delete --exclude=/data gemini/build/ ubuntu@ambylastname.xyz:~/gem_site/content

#echo -e "\nbuilding magpie docs..."
#cd magpie
#make clean html
#rsync -av --delete build/html/ ubuntu@ambylastname.xyz:~/wobsite/content/magpie
