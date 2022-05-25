#!/usr/bin/env bash

set -eo pipefail

cd proto
buf mod update
cd ..

buf generate

# move proto files to the right places
cp -r github.com/notional-labs/anone/* ./
rm -rf github.com
