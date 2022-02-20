import dotenv from 'dotenv';
import commandLineArgs from 'command-line-args';
import {Connection, Error} from "mongoose";
import mongoose from "mongoose";

// Setup command line options
const options = commandLineArgs([
    {
        name: 'env',
        alias: 'e',
        defaultValue: 'development',
        type: String,
    },
]);

// Set the env file
dotenv.config();

let conn:Promise<Connection> | Connection;
let connection: Connection;
// eslint-disable-next-line max-len
const uri = process.env.MONGODB_URI as string; //
if(!uri) {
    throw new Error("No mongo uri");
}
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(uri);
mongoose.connection.on('connected', () => {
    console.log('Connected to mongo');
});
mongoose.connection.on('error', (err) => {
    console.error(err);
    console.log(process.env.MONGODB_URI);
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.');
    process.exit();
});

