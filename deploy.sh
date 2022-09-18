#!/bin/bash

cd /home/ajal/Documents/code/wobsite_staticcc
now=$(date +%Y-%m-%d)
kepler_init="2022-07-01"
time_since_kepler=$(dateutils.ddiff $kepler_init $now)
time staticcc -tsSf -R "BUILDTIME=$(date --rfc-2822)"

echo -e "\nsyncing main site..."
rsync -av --delete --exclude=/data --exclude=/magpie build/ ubuntu@ambylastname.xyz:~/wobsite/content

echo -e "\nbuilding gem site..."
gemini/gem_build.py
echo -e "\nsyncing gemini site..."
rsync -av --delete --exclude=/data gemini/build/ ubuntu@ambylastname.xyz:~/gem_site/content

echo -e "\nbuilding magpie docs..."
cd magpie
make html
rsync -av --delete build/html/ ubuntu@ambylastname.xyz:~/wobsite/content/magpie
