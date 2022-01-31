// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import AWS from 'aws-sdk';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import dotenv from 'dotenv';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import mongoose, {Connection, Error, Model} from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-var-requires
require('mongoose-long')(mongoose);

import {AttestationModel, AttestationSchema} from "./models/mongo/AttestationModel";
dotenv.config();
import {MongoAttestationService} from "./service/MongoAttestationService";

let conn:Promise<Connection> | Connection;
let connection: Connection;
// eslint-disable-next-line max-len
const uri = process.env.MONGODB_URI as string; //
if(!uri) {
    throw new Error("No mongo uri");
}
let model: Model<AttestationModel>
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);

/**
 * AWS config for handler function should be 'dist/handler.handler'
 * @param event
 * @param context
 */
export const handler = async function(event: any, context:any) {
    console.log("Calling attestation lambda handler");
    if(event.requestContext.http.method == 'GET' || event.requestContext.http.method == 'OPTIONS') {
        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type,Access-Control-Allow-Origin'
            },
            "isBase64Encoded": false,

            "body": JSON.stringify({message: "OK"})
        }
    }
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
        await conn
        console.log("Mongo connection established");
        connection = conn as Connection;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/ban-ts-comment
        // @ts-ignore
        model = connection.model("User", AttestationSchema);
        console.log("Models constructed");
    }
    console.log("Handling event", event);

    try {
        console.log("Building Service")
        const service = new MongoAttestationService(model);
        const body = JSON.parse(event.body);
        console.log("Handling request", body);
        const response = await service.writeAttestation(body)
        console.log("Request handled successfully.", response)
        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type,Access-Control-Allow-Origin'
            },
            "isBase64Encoded": false,
            "body": JSON.stringify({message: "Successful Attestation"})
        }
    } catch(err) {
        console.log(err);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const body = err.message
        return {
            statusCode: 400,
            body: JSON.stringify(body),
            isBase64Encoded:false,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
}


