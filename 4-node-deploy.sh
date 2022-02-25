#!/bin/bash

CHAINID="anoned-1"
KB="file"
cd $HOME
if [! -d "/4-node/" ]; then
    mkdir 4-node
fi
cd 4-node

# Install the fisrt node
anoned init node-1 --home node-1 --chain-id $CHAINID
anoned keys add node-1 --home node-1
