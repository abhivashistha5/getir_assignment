import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import config from './config';
import logger from './lib/logger';
import unknownRoute from './middleware/unknownRoute';
import errorHandler from './middleware/errorHandler';
import healthRoute from './route/health/health.controller';
import recordRoute from './route/record/record.controller';

const app = express();
app.use(morgan(':date[iso] :method :url :status - :response-time ms'));

// register routes
app.use('/health', healthRoute);
app.use('/record', recordRoute);

// register error handler middlewares
app.use(unknownRoute);
app.use(errorHandler);

// connect to database
mongoose.connect(
    config.database.connectionUri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) {
            logger.error(err);
            process.exit(1);
        }
        logger.info('Mongo DB Connected');

        // start the server
        app.listen(config.http.port, () => {
            logger.info(`Started listening on port: ${config.http.port}`);
        });
    },
);

export default app;
