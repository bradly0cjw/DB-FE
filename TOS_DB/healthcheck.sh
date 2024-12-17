#!/bin/sh

while true; do
  curl -X POST "https://status.cypone.dev/api/push/07nJKOHs1R?status=up&msg=OK&ping="
  sleep 60
done