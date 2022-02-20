import { Request } from 'express';

export const paramMissingError = 'One or more of the required parameters was missing.';

export interface IRequest extends Request {
    body: {
        user: any,
    }
} 
