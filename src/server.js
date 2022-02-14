import express from 'express';
import morgan from 'morgan';
import config from './config.js';
import logger from './lib/logger.js';
import route from './route/index.js';

const app = express();
app.use(morgan(':date[iso] :method :url :status - :response-time ms'));

app.use('/', route);

app.listen(config.http.port, () => {
    logger.log(`Started listening on port: ${config.http.port}`);
});

export default app;
