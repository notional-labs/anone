/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, BigNumberish } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides } from "@ethersproject/contracts";

import type { CosmosERC20 } from "../CosmosERC20";

export class CosmosERC20__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _gravityAddress: string,
    _name: string,
    _symbol: string,
    _decimals: BigNumberish,
    overrides?: Overrides
  ): Promise<CosmosERC20> {
    return super.deploy(
      _gravityAddress,
      _name,
      _symbol,
      _decimals,
      overrides || {}
    ) as Promise<CosmosERC20>;
  }
  getDeployTransaction(
    _gravityAddress: string,
    _name: string,
    _symbol: string,
    _decimals: BigNumberish,
    overrides?: Overrides
  ): TransactionRequest {
    return super.getDeployTransaction(
      _gravityAddress,
      _name,
      _symbol,
      _decimals,
      overrides || {}
    );
  }
  attach(address: string): CosmosERC20 {
    return super.attach(address) as CosmosERC20;
  }
  connect(signer: Signer): CosmosERC20__factory {
    return super.connect(signer) as CosmosERC20__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CosmosERC20 {
    return new Contract(address, _abi, signerOrProvider) as CosmosERC20;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_gravityAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "_decimals",
        type: "uint8",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040526000196005553480156200001757600080fd5b5060405162000d3e38038062000d3e8339810160408190526200003a9162000307565b8251839083906200005390600390602085019062000194565b5080516200006990600490602084019062000194565b5050600680546001600160a01b038716610100026001600160a81b031990911660ff85161717905550600554620000a2908590620000ac565b505050506200040f565b6001600160a01b038216620001075760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640160405180910390fd5b80600260008282546200011b9190620003ab565b90915550506001600160a01b038216600090815260208190526040812080548392906200014a908490620003ab565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b828054620001a290620003d2565b90600052602060002090601f016020900481019282620001c6576000855562000211565b82601f10620001e157805160ff191683800117855562000211565b8280016001018555821562000211579182015b8281111562000211578251825591602001919060010190620001f4565b506200021f92915062000223565b5090565b5b808211156200021f576000815560010162000224565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200026257600080fd5b81516001600160401b03808211156200027f576200027f6200023a565b604051601f8301601f19908116603f01168101908282118183101715620002aa57620002aa6200023a565b81604052838152602092508683858801011115620002c757600080fd5b600091505b83821015620002eb5785820183015181830184015290820190620002cc565b83821115620002fd5760008385830101525b9695505050505050565b600080600080608085870312156200031e57600080fd5b84516001600160a01b03811681146200033657600080fd5b60208601519094506001600160401b03808211156200035457600080fd5b620003628883890162000250565b945060408701519150808211156200037957600080fd5b50620003888782880162000250565b925050606085015160ff81168114620003a057600080fd5b939692955090935050565b60008219821115620003cd57634e487b7160e01b600052601160045260246000fd5b500190565b600181811c90821680620003e757607f821691505b602082108114156200040957634e487b7160e01b600052602260045260246000fd5b50919050565b61091f806200041f6000396000f3fe608060405234801561001057600080fd5b50600436106100a95760003560e01c80633950935111610071578063395093511461012d57806370a082311461014057806395d89b4114610169578063a457c2d714610171578063a9059cbb14610184578063dd62ed3e1461019757600080fd5b806306fdde03146100ae578063095ea7b3146100cc57806318160ddd146100ef57806323b872dd14610105578063313ce56714610118575b600080fd5b6100b66101d0565b6040516100c3919061073d565b60405180910390f35b6100df6100da3660046107ae565b610262565b60405190151581526020016100c3565b6100f7610278565b6040519081526020016100c3565b6100df6101133660046107d8565b6102aa565b60065460405160ff90911681526020016100c3565b6100df61013b3660046107ae565b610359565b6100f761014e366004610814565b6001600160a01b031660009081526020819052604090205490565b6100b6610395565b6100df61017f3660046107ae565b6103a4565b6100df6101923660046107ae565b61043d565b6100f76101a5366004610836565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6060600380546101df90610869565b80601f016020809104026020016040519081016040528092919081815260200182805461020b90610869565b80156102585780601f1061022d57610100808354040283529160200191610258565b820191906000526020600020905b81548152906001019060200180831161023b57829003601f168201915b5050505050905090565b600061026f33848461044a565b50600192915050565b60065461010090046001600160a01b03166000908152602081905260408120546005546102a591906108ba565b905090565b60006102b784848461056e565b6001600160a01b0384166000908152600160209081526040808320338452909152902054828110156103415760405162461bcd60e51b815260206004820152602860248201527f45524332303a207472616e7366657220616d6f756e74206578636565647320616044820152676c6c6f77616e636560c01b60648201526084015b60405180910390fd5b61034e853385840361044a565b506001949350505050565b3360008181526001602090815260408083206001600160a01b0387168452909152812054909161026f9185906103909086906108d1565b61044a565b6060600480546101df90610869565b3360009081526001602090815260408083206001600160a01b0386168452909152812054828110156104265760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b6064820152608401610338565b610433338585840361044a565b5060019392505050565b600061026f33848461056e565b6001600160a01b0383166104ac5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610338565b6001600160a01b03821661050d5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610338565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6001600160a01b0383166105d25760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610338565b6001600160a01b0382166106345760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610338565b6001600160a01b038316600090815260208190526040902054818110156106ac5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610338565b6001600160a01b038085166000908152602081905260408082208585039055918516815290812080548492906106e39084906108d1565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161072f91815260200190565b60405180910390a350505050565b600060208083528351808285015260005b8181101561076a5785810183015185820160400152820161074e565b8181111561077c576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b03811681146107a957600080fd5b919050565b600080604083850312156107c157600080fd5b6107ca83610792565b946020939093013593505050565b6000806000606084860312156107ed57600080fd5b6107f684610792565b925061080460208501610792565b9150604084013590509250925092565b60006020828403121561082657600080fd5b61082f82610792565b9392505050565b6000806040838503121561084957600080fd5b61085283610792565b915061086060208401610792565b90509250929050565b600181811c9082168061087d57607f821691505b6020821081141561089e57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b6000828210156108cc576108cc6108a4565b500390565b600082198211156108e4576108e46108a4565b50019056fea264697066735822122029e16187b55f42f2a731248eb2208d3d17fce01ae0798f5c5e92d49dfaf1225a64736f6c634300080a0033";
