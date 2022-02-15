import express from 'express';
import morgan from 'morgan';
import config from './config';
import logger from './lib/logger';
import healthRoute from './route/health';

const app = express();
app.use(morgan(':date[iso] :method :url :status - :response-time ms'));

app.use('/health', healthRoute);

app.listen(config.http.port, () => {
    logger.info(`Started listening on port: ${config.http.port}`);
});

export default app;
