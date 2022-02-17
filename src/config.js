import dotenv from 'dotenv';

dotenv.config();

export default {
    http: {
        port: process.env.PORT || 8080,
    },
    logging: {
        level: process.env.LOG_LEVEL,
    },
    database: {
        connectionUri: process.env.MONGO_CONNECTION_URI,
    },
    requestValidation: {
        abortEarly: false, // check for all the errors
        allowUnknown: true, // allow unknown props
        stripUnknown: true, // remove unknown props
    },
};
