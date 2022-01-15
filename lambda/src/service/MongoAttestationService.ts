
import {IAttestation} from "../models/Attestation";
import {AttestationModel} from "../models/mongo/AttestationModel";
import {ethers} from 'ethers';
import {Model} from "mongoose";

export class MongoAttestationService {
    AttModel: Model<AttestationModel>
    constructor(AttModel: Model<AttestationModel>) {
        this.AttModel = AttModel
    }
    writeAttestation = async (attestation: IAttestation): Promise<AttestationModel> => {
        console.log("Attempting to record attestation")
        const {oneAddress, ethAddress, signature} = attestation;
        console.log("Finding "+ethAddress)
        const hasOne = await this.AttModel.findById(ethAddress);
        if(hasOne) {
            throw new Error(`Already logged: ${ethAddress} with ONE address: ${hasOne.oneAddress}`);
        }
        console.log(`No record for ${ethAddress}, verifying signature`)
        try {
            this.verifySignature({ message: oneAddress, address: ethAddress, signature} )
        } catch(err) {
            //could not verify sig.
            throw new Error("Cannot validate eth signature.")
        }
        console.log(`Signature verified, recording attestation`);
        const model = new this.AttModel({
           _id: ethAddress,
           ...attestation
        });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        model.added = new Date().toISOString();
        console.log(model.toJSON());
        await model.save();
        console.log(`Attestation recorded for ${ethAddress} and ${oneAddress}`);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return model;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    verifySignature = ({ message, address, signature }):boolean => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            const signerAddr = ethers.utils.verifyMessage(message, signature);
            if (signerAddr !== address) {
                return false;
            }

            return true;
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

}

