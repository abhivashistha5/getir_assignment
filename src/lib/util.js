import { responseCode } from '../common/statusCode';

export const responseBuilder = (code = responseCode.SUCCESS, message = 'Success', data = []) => ({
    code,
    msg: message,
    records: data,
});

export const errorBuilder = (statusCode, response) => ({
    statusCode,
    response,
});
