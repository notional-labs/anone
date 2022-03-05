/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface ReentrantERC20Interface extends ethers.utils.Interface {
  functions: {
    "transfer(address,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "transfer",
    values: [string, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;

  events: {};
}

export class ReentrantERC20 extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: ReentrantERC20Interface;

  functions: {
    transfer(
      arg0: string,
      arg1: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "transfer(address,uint256)"(
      arg0: string,
      arg1: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  transfer(
    arg0: string,
    arg1: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "transfer(address,uint256)"(
    arg0: string,
    arg1: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    transfer(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "transfer(address,uint256)"(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    transfer(
      arg0: string,
      arg1: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "transfer(address,uint256)"(
      arg0: string,
      arg1: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    transfer(
      arg0: string,
      arg1: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "transfer(address,uint256)"(
      arg0: string,
      arg1: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}
