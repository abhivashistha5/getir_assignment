import { responseMessage } from '../common/responseMessage';
import { httpStatus, responseCode } from '../common/statusCode';
import { responseBuilder } from '../lib/util';

// eslint-disable-next-line no-unused-vars
export default (err, req, res, next) => {
    let statusCode;
    let response;

    if (err && err.error) {
        // handle joi validation error
        statusCode = httpStatus.BAD_REQUEST;
        response = responseBuilder(
            responseCode.BAD_REQUEST,
            err.error.toString(),
            [],
        );
    } else {
        // handle other errors
        statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
        response = err.response || responseBuilder(
            responseCode.SERVER_ERROR,
            responseMessage.SOMETHING_WENT_WRONG,
            [],
        );
    }

    res.status(statusCode).json(response);
};
