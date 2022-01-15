import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import mongoose, {Connection, Error} from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-var-requires
require('mongoose-long')(mongoose);

import {ATTESTATION_COLLECTION, AttestationSchema} from "./models/mongo/AttestationModel";
dotenv.config();
import {MongoAttestationService} from "./service/MongoAttestationService";

let conn:Promise<Connection> | Connection;
let connection: Connection;
// eslint-disable-next-line max-len
const uri = process.env.MONGODB_URI as string; //
if(!uri) {
    throw new Error("No mongo uri");
}
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);

// eslint-disable-next-line @typescript-eslint/require-await
const handleAttestation= async (connection:Connection, event:any) => {
    return null;
}

export const handler = async function(event: any, context:any) {
    console.log("Calling attestation lambda handler");
    // console.log(`connecting to mongo at: ${uri}`);
    // console.log(event);
    // console.log(context);
    // Make sure to add this so you can re-use `conn` between function calls.
    // See https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas
    context.callbackWaitsForEmptyEventLoop = false;

    // Because `conn` is in the global scope, Lambda may retain it between
    // function calls thanks to `callbackWaitsForEmptyEventLoop`.
    // This means your Lambda function doesn't have to go through the
    // potentially expensive process of connecting to MongoDB every time.
    if (conn == null) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        conn = mongoose.createConnection(uri, {
            // Buffering means mongoose will queue up operations if it gets
            // disconnected from MongoDB and send them when it reconnects.
            // With serverless, better to fail fast if not connected.
            bufferCommands: false, // Disable mongoose buffering
            bufferMaxEntries: 0, // and MongoDB driver buffering
            useNewUrlParser: true
        });

        // `await`ing connection after assigning to the `conn` variable
        // to avoid multiple function calls creating new connections
        await conn;
        console.log("Mongo connection established");
        connection = conn as Connection;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        connection.model(ATTESTATION_COLLECTION, AttestationSchema, ATTESTATION_COLLECTION);
        console.log("Models constructed");
    }
    console.log("Handling event", event);

    //console.log('Received event:', JSON.stringify(event, null, 2));

    let response;
    let statusCode = '200';
    const headers = {
        'Content-Type': 'application/json',
    };
    try {
        const service = new MongoAttestationService();
        response = await service.writeAttestation(event.body)
    } catch(err) {
        console.log(err);
        statusCode = '400'

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        response = err.message
    }
    return {
        statusCode,
        body: response,
        headers,
    };

}


