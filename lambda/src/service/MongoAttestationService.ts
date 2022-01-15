import {Attestation} from '../models/mongo/AttestationModel'
import {IAttestation} from "../models/Attestation";
import {ethers} from 'ethers';

export class MongoAttestationService {

    writeAttestation = async (attestation: IAttestation): Promise<IAttestation> => {
        const {oneAddress, ethAddress, signature} = attestation;
        try {
            this.verifySignature({ message: oneAddress, address: ethAddress, signature} )
        } catch(err) {
            //could not verify sig.
            throw new Error("Cannot validate eth signature.")
        }
        const hasOne = await Attestation.findById(ethAddress);
        if(hasOne) {
            throw new Error(`Already logged: ${ethAddress} with ONE address: ${hasOne.oneAddress}`);
        }
        const model = new Attestation({
           _id: ethAddress,
           ...attestation
        });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        model.added = new Date().toISOString();
        console.log(model.toJSON());
        await model.save();

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

