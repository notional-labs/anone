# Business flow

### Connecting to Keplr
    - Bootstrap Anone Testnet
    - Collect user permission (if Anone testnet is not yet authorized in your Keplr)
    - Connect to chain through RPC
    - Set a reference to query using the "smart" module

### Minting NFT
    - Collect form data
    - Upload image to IPFS
    - Upload JSON Metadata to IPFS
    - Broadcast mint transaction
    - Wait for block confirmation and view minted NFT

### Transfer NFT
    - Collect form data
    - Broadcast transfer transaction
    - Wait for block confirmation and verify the token has been transfered to the recipient

### Burning NFT
    - Broadcast burn transaction
    - Wait for block confirmation and verify the token has been burned