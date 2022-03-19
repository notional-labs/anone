import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { calculateFee, GasPrice } from "@cosmjs/stargate";
import { AnoneTestnetInfo } from "./chain.info.anonetestnet";
import ipfsClient from "./ipfs";

export async function connectWallet() {
  console.log("Connecting wallet...");
  try {
    if (window) {
      if (window["keplr"]) {
        if (window.keplr["experimentalSuggestChain"]) {
          await window.keplr.experimentalSuggestChain(AnoneTestnetInfo);
          await window.keplr.enable(AnoneTestnetInfo.chainId);
          offlineSigner = await window.getOfflineSigner(
            AnoneTestnetInfo.chainId
          );
          wasmClient = await SigningCosmWasmClient.connectWithSigner(
            AnoneTestnetInfo.rpc,
            offlineSigner
          );
          accounts = await offlineSigner.getAccounts();

          console.log("Wallet connected", {
            offlineSigner: offlineSigner,
            wasmClient: wasmClient,
            accounts: accounts,
            chain: AnoneTestnetInfo,
          });
          // Query ref.
          handlers.query = UploadResult;
          wasmClient.queryClient.wasm.queryContractSmart;
          // Gas
          gas.price = GasPrice.fromString("0.002uan1");
          // Debug
          console.log("dApp Initialized", {
            user: accounts[0].address,
            client: wasmClient,
            handlers: handlers,
            gas: gas,
          });

          // Anone testnet account balances ('uan1')
          if (accounts.length) {
            await getBalances();
          }

          // User and market NFTs
          await loadNfts();
        } else {
          console.warn(
            "Error access experimental features, please update Keplr"
          );
        }
      } else {
        console.warn("Error accessing Keplr");
      }
    } else {
      console.warn("Error parsing window object");
    }
  } catch (e) {
    console.error("Error connecting to wallet", e);
  }
}

export async function getBalance() {
  if (!AnoneTestnetInfo) {
    return;
  } else if (!AnoneTestnetInfo["chainName"]) {
    return;
  } else if (!AnoneTestnetInfo["currencies"]) {
    return;
  } else if (!AnoneTestnetInfo.currencies.length) {
    return;
  }
  this.loading = {
    status: true,
    msg: "Updating account balances...",
  };
  if (this.accounts) {
    if (this.accounts.length) {
      for (let i = 0; i < this.accounts.length; i++) {
        if (this.accounts[i]["address"]) {
          try {
            console.log("address", this.accounts[i].address);
            let balance = await this.wasmClient.getBalance(
              this.accounts[i].address,
              AnoneTestnetInfo.currencies[0].coinMinimalDenom
            );
            this.accounts[i].balance = balance;
            this.loading.status = false;
            this.loading.msg = "";
            console.log("Balance updated", this.accounts[i].balance);
          } catch (e) {
            console.warn("Error reading account address", [
              String(e),
              this.accounts[i],
            ]);
            this.loading.status = false;
            this.loading.msg = "";
            return;
          }
        } else {
          console.warn(
            "Failed to resolve account address at index " + i,
            this.accounts[i]
          );
        }
      }
    } else {
      this.loading.status = false;
      this.loading.msg = "";
      console.warn("Failed to resolve Keplr wallet");
    }
  } else {
    this.loading.status = false;
    this.loading.msg = "";
    console.warn("Failed to resolve Keplr wallet");
  }
}

export async function ipfsUpload() {
  if (!this.files.length) {
    console.warn("Nothing to upload to IPFS");
    return;
  }

  this.loading = {
    status: true,
    msg: "Uploading art to IPFS...",
  };

  this.isMinting = true;

  // Art upload
  const reader = new FileReader();
  let file = this.files[0];
  reader.readAsDataURL(file);

  reader.onload = async (event) => {
    this.image = event.target.result;
    // console.log('reader.onload', {
    //   reader: reader,
    //   result: reader.result,
    //   image: this.image
    // });
    try {
      let uploadResult = await ipfsClient.IPFS.upload(this.image);
      console.log("Successfully uploaded art", [
        uploadResult,
        String(uploadResult.cid),
      ]);

      // Metadata upload (json)
      this.loading = {
        status: true,
        msg: "Uploading metadata to IPFS...",
      };
      this.metadata.ipfsMetadata.date = new Date().getTime();
      this.metadata.ipfsMetadata.image = IPFS_PREFIX + String(uploadResult.cid);
      +IPFS_SUFFIX;

      let json = JSON.stringify(this.metadata.ipfsMetadata);
      const blob = new Blob([json], { type: "application/json" });
      const jsonReader = new FileReader();
      jsonReader.readAsDataURL(blob);

      jsonReader.onload = async (event) => {
        let jsonUploadTarget = event.target.result;
        let metadataUploadResult = await ipfsClient.IPFS.upload(jsonUploadTarget);
        console.log("Successfully uploaded JSON metadata to IPFS", [
          metadataUploadResult,
          String(metadataUploadResult.cid),
        ]);
        this.metadata.uri =
          IPFS_PREFIX + String(metadataUploadResult.cid) + IPFS_SUFFIX;

        // Mint NFT
        await this.mintNft();
      };
    } catch (e) {
      console.error("Error uploading file to IPFS: ", e);
      this.loading.status = false;
      this.loading.msg = "";
      return;
    }
  };
  reader.onerror = (e) => {
    console.error("Error uploading file to IPFS: ", e);
    this.loading.status = false;
    this.loading.msg = "";
    return;
  };
}

export async function loadNfts() {
  // XXX TODO: Fix request tokens of address
  // Load NFTs
  try {
    // User NFTs
    // this.nfts.user = await this.getNftsOfOwner();
    // console.log('My NFTs', this.nfts.user);
    // All NFTs (of contract)
    this.nfts.market = await this.getNfts();
    console.log("All NFTs", this.nfts.market);
    // console.log('NFTs at contract '+ this.contract +' have been loaded', this.nfts);

    // Iterate ID's and get token data
    await this.loadNftData();
  } catch (e) {
    console.error("Error loading NFTs", {
      nfts: this.nfts,
      user: this.accounts,
      error: e,
    });
  }
}

export async function mintNft() {
  // SigningCosmWasmClient.execute: async (senderAddress, contractAddress, msg, fee, memo = "", funds)
  if (!this.accounts) {
    console.warn("Error getting user", this.accounts);
    return;
  } else if (!this.accounts.length) {
    console.warn("Error getting user", this.accounts);
    return;
  }

  // Refresh NFT market to get last minted ID
  // (Tx. might still fail if multiple users try to mint in the same block)
  this.loadNfts();
  let token_id_to_mint =
    this.nfts.market.tokens.length > 0
      ? Number(this.nfts.market.tokens[this.nfts.market.tokens.length - 1].id) +
        1
      : Number(1);

  // Prepare Tx
  let entrypoint = {
    mint_for: {
      token_id: String(token_id_to_mint),
      recipient: this.accounts[0].address,
      token_uri: this.metadata.uri,
      extension: null, // XXX: null prop?
    },
  };

  console.log("Entrypoint", entrypoint);

  this.loading = {
    status: true,
    msg: "Minting NFT...",
  };
  let txFee = calculateFee(300000, this.gas.price); // XXX TODO: Fix gas estimation (https://github.com/cosmos/cosmjs/issues/828)
  console.log("Tx args", {
    senderAddress: this.accounts[0].address,
    contractAddress: this.contract,
    msg: entrypoint,
    fee: txFee,
  });
  try {
    // Send Tx
    let tx = await this.wasmClient.execute(
      this.accounts[0].address,
      this.contract,
      entrypoint,
      txFee
    );
    this.loading.status = false;
    this.loading.msg = "";
    console.log("Mint Tx", tx);

    // Reset minting form
    this.resetMetadataForm();

    // Update Logs
    if (tx.logs) {
      if (tx.logs.length) {
        this.logs.unshift({
          mint: tx.logs,
          timestamp: new Date().getTime(),
        });
        console.log("Logs Updated", this.logs);
      }
    }
    // Refresh NFT collections (all NFTs and NFTs owned by end user)
    await this.loadNfts();
    if (this.accounts.length) {
      await this.getBalances();
    }
  } catch (e) {
    console.warn("Error executing mint tx", e);
    this.loading.status = false;
    this.loading.msg = "";
  }
}

export async function transferNft() {
  // SigningCosmWasmClient.execute: async (senderAddress, contractAddress, msg, fee, memo = "", funds)
  if (!this.accounts) {
    console.warn("Error getting user", this.accounts);
    return;
  } else if (!this.accounts.length) {
    console.warn("Error getting user", this.accounts);
    return;
  } else if (!tokenId || !recipient) {
    console.warn("Nothing to transfer (check token ID and recipient address)", {
      token_id: tokenId,
      recipient: recipient,
    });
    return;
  }
  // Prepare Tx
  let entrypoint = {
    transfer_nft: {
      recipient: recipient,
      token_id: tokenId,
    },
  };
  this.isSending = true;
  this.loading = {
    status: true,
    msg: "Transferring NFT to " + recipient + "...",
  };
  let txFee = calculateFee(300000, this.gas.price); // XXX TODO: Fix gas estimation (https://github.com/cosmos/cosmjs/issues/828)
  // Send Tx
  try {
    let tx = await this.wasmClient.execute(
      this.accounts[0].address,
      this.contract,
      entrypoint,
      txFee
    );
    console.log("Transfer Tx", tx);
    this.loading.status = false;
    this.loading.msg = "";
    this.isSending = false;

    // Update Logs
    if (tx.logs) {
      if (tx.logs.length) {
        this.logs.unshift({
          transfer: tx.logs,
          timestamp: new Date().getTime(),
        });
        console.log("Logs Updated", this.logs);
      }
    }
    // Refresh NFT collections and balances
    await this.loadNfts();
    if (this.accounts.length) {
      await this.getBalances();
    }
  } catch (e) {
    console.warn("Error executing NFT transfer", e);
    this.loading.status = false;
    this.loading.msg = "";
  }
}

export async function burnNft() {
  // SigningCosmWasmClient.execute: async (senderAddress, contractAddress, msg, fee, memo = "", funds)
  if (!this.accounts) {
    console.warn("Error getting user", this.accounts);
    return;
  } else if (!this.accounts.length) {
    console.warn("Error getting user", this.accounts);
    return;
  } else if (!tokenId) {
    console.warn("Nothing to burn (check token ID)", { token_id: tokenId });
    return;
  }

  // Prepare Tx
  let entrypoint = {
    burn: {
      token_id: tokenId,
    },
  };
  this.isBurning = true;
  this.loading = {
    status: true,
    msg: "Burning NFT with Token ID: " + tokenId + "...",
  };
  let txFee = calculateFee(300000, this.gas.price); // XXX TODO: Fix gas estimation (https://github.com/cosmos/cosmjs/issues/828)
  // Send Tx
  try {
    let tx = await this.wasmClient.execute(
      this.accounts[0].address,
      this.contract,
      entrypoint,
      txFee
    );
    console.log("Burn NFT Tx", tx);
    this.loading.status = false;
    this.loading.msg = "";
    this.isBurning = false;

    // Update Logs
    if (tx.logs) {
      if (tx.logs.length) {
        this.logs.unshift({
          transfer: tx.logs,
          timestamp: new Date().getTime(),
        });
        console.log("Logs Updated", this.logs);
      }
    }
    // Refresh NFT collections and balances
    await this.loadNfts();
    if (this.accounts.length) {
      await this.getBalances();
    }
  } catch (e) {
    console.warn("Error executing burn NFT", e);
    this.loading.status = false;
    this.loading.msg = "";
  }
}
