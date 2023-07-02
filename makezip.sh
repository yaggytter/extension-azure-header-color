#!/bin/bash

cd `dirname $0`

rm ../hccaz.zip
zip -r ../hccaz.zip _locales icons screenshots *.js *.json *.html
