
export interface IAttestation {
    ethAddress:string,
    oneAddress:string,
    NFTs: string[],
    burned: number,
    signature: string
    added?: Date | string
}
