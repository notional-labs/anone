# Anone Tools

Anone Tools is a set of tools for launching a collection and minting on Anone.

## Create an account on testnet

```sh
yarn account
```

This outputs an address you can use to instantiate your minter contract.

## Get funds from faucet

Ask for funds from the `#faucet` channel in Discord Anone.

```
$request [address]
```

## Configure project

Copy `config.example.js` to `config.js`.
Edit `config.js` with your project configuration.

## Initialize an NFT minting contract

```sh
yarn minter
```

## Mint

### Mint a specific NFT to an address

```sh
yarn mint --for [token_id] [address]
```

`[address]` can be any Cosmos address. It'll be converted automatically into a Anone address.

### Mint to an address

```sh
yarn mint --to [address]
```

This mints the next available token ID to the given address.

### Batch mint

Mint `num` NFTs to an address.

```sh
yarn mint --to [address] --batch [num]
```

Same as `mint --to` but mints the next [num] tokens sequentially to the given address.

## Whitelist (optional)

Instantiate a whitelist contract:

```sh
yarn whitelist
```

The output of the above command should give you a whitelist contract address. Edit `config.js` and update the `whitelist` field with this value. Next, set this address in your minter contract with:

```sh
yarn minter --whitelist [whitelist_address]
```

To add addresses to the whitelist, use:

```sh
yarn whitelist --add [stars1..., stars2..., etc.]
```

## Query an721

You can run queries against an instantiated an721 contract with:

```sh
yarn query
```

## Testnet

# More documentation

# Disclaimer

# Terms and Conditions
