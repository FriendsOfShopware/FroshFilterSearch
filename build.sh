#!/usr/bin/env bash

commit=$1
if [ -z ${commit} ]; then
    commit=$(git tag | tail -n 1)
    if [ -z ${commit} ]; then
        commit="master";
    fi
fi

# Remove old release
rm -rf FroshFilterSearch FroshFilterSearch-*.zip

# Build new release
mkdir -p FroshFilterSearch
git archive ${commit} | tar -x -C FroshFilterSearch
zip -x "*build.sh*" -x "*.MD" -r FroshFilterSearch-${commit}.zip FroshFilterSearch