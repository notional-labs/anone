#!/bin/bash

NODE="http://127.0.0.1:2281"
ACCOUNT="Developer"
CHAINID="anone-testnet-1"

RES=$(anoned query bank total $NODE)