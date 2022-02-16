import { httpStatus, responseCode } from '../common/statusCode';
import { responseBuilder, errorBuilder } from '../lib/util';

export default (req, res, next) => {
    next(
        errorBuilder(httpStatus.NOT_FOUND, responseBuilder(responseCode.NOT_FOUND, 'Api not found')),
    );
};
