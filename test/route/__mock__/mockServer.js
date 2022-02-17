import express from 'express';
import bodyParser from 'body-parser';
import unknownRoute from '../../../src/middleware/unknownRoute';
import errorHandler from '../../../src/middleware/errorHandler';

export default (route) => {
    const app = express();

    // register middlewares
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // register route
    app.use('/', route);

    // register error handlers
    app.use(unknownRoute);
    app.use(errorHandler);

    return app;
};
