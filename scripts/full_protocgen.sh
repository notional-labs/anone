#!/usr/bin/env bash

set -eo pipefail

go get go.buf.build/protocolbuffers/go/cosmos/cosmos-sdk
go get go.buf.build/protocolbuffers/go/googleapis/googleapis

cd proto
buf mod update
cd ..

buf generate

# move proto files to the right places
cp -r github.com/notional-labs/anone/* ./
rm -rf github.com
