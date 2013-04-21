#!/bin/sh
echo Cleaning all projects temporary files
c=0; for f in $(find . | grep -v '.py27' | grep \.pyc$); do echo deleting $f && rm $f && c=$((c+1)); done; echo $c files deleted
rm -rf .DS_Store target/ *.egg-info/ *.egg/ dist/ test-reports/ .coverage ghostdriver.log features/ghostdriver.log
find * -type d -empty -delete
