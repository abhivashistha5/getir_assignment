import { responseCode } from '../common/statusCode';
import { responseBuilder } from '../lib/util';

// eslint-disable-next-line no-unused-vars
export default (err, req, res, next) => {
    res
        .status(err.statusCode || 500)
        .json(
            err.response
            || responseBuilder(
                responseCode.SERVER_ERROR,
                'Oops! Something went wrong.',
                [],
            ),
        );
};
