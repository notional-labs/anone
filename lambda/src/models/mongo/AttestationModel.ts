import {Schema, Date, model} from 'mongoose';
import {IAttestation} from "../Attestation";


export interface AttestationModel extends IAttestation {
    _id: string,
    added: string,
    ethAddress: string,
    oneAddress: string,
    NFTs: string[],
    signature: string
}

export const AttestationSchema = new Schema({
   _id: {type: String},
   added:  Date,
   ethAddress: String,
   oneAddress: String,
   NFTs: [],
   signature: String
}, { versionKey: false });



export const Attestation = model<AttestationModel>('User', AttestationSchema);
