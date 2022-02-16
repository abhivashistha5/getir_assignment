/* eslint-disable import/prefer-default-export */
/* eslint-disable max-classes-per-file */
import { responseMessage } from './responseMessage';

export class DB_ERROR extends Error {
    constructor() {
        super(responseMessage.DB_ERROR);
    }
}
