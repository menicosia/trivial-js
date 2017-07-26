#!/bin/sh

set -e

if [ 1 -ne $# ] ; then
  echo "Usage: $0 URL"
  exit -1
fi

URL=$1

status=$(curl -s $URL)

echo "$0 got status: $status"

if [ 0 -ne $? ]; then
  echo "ERROR: curl failed: $URL"
  exit 0
fi

if [ "1X" != "$status"X ]; then exit 1; fi

exit 0

