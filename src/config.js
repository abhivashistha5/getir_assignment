import dotenv from 'dotenv';

dotenv.config();

export default {
    http: {
        port: process.env.HTTP_SERVER_PORT || 8080,
    },
    logging: {
        level: process.env.LOG_LEVEL || 'debug',
    },
};
