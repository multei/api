#!/bin/bash
STAGED_FILES=$(git diff --name-only --diff-filter=ACM | grep "js$")

if [[ "$STAGED_FILES" = "" ]]; then
    exit 0
fi

if [[ ${jest --bail --findRelatedTests "$STAGED_FILES"} == 0 ]]; then
  printf "\t\033[32mJest Tests Passed\033[0m"
else
  print "\t\033[41mJest Tests Failed\033[0m"
  PASS=false
fi
