import dotenv from 'dotenv';

dotenv.config();

export default {
    http: {
        port: process.env.PORT || 8080,
    },
    logging: {
        level: process.env.LOG_LEVEL || 'debug',
    },
};
