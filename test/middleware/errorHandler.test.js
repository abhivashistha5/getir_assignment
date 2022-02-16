import {
    describe, expect, it, jest,
} from '@jest/globals';
import { httpStatus, responseCode } from '../../src/common/statusCode';
import errorHandler from '../../src/middleware/errorHandler';

describe('errorHandler', () => {
    it('should send formatted error response', () => {
        // Given
        const err = {
            statusCode: httpStatus.BAD_REQUEST,
            response: { dummy: 'response' },
        };

        const jsonFn = jest.fn();

        const res = {
            status: jest.fn().mockReturnValue({
                json: jsonFn,
            }),
        };

        // When
        errorHandler(err, null, res, null);

        // Then
        expect(res.status).toBeCalledWith(httpStatus.BAD_REQUEST);
        expect(jsonFn).toBeCalledWith({
            dummy: 'response',
        });
    });

    it('should send internal server error status if no statusCode is given', () => {
        // Given
        const err = {
            response: { dummy: 'response' },
        };

        const jsonFn = jest.fn();

        const res = {
            status: jest.fn().mockReturnValue({
                json: jsonFn,
            }),
        };

        // When
        errorHandler(err, null, res, null);

        // Then
        expect(res.status).toBeCalledWith(httpStatus.INTERNAL_SERVER_ERROR);
        expect(jsonFn).toBeCalledWith({
            dummy: 'response',
        });
    });

    it('should send default response if no response is given', () => {
        // Given
        const err = {};

        const jsonFn = jest.fn();

        const res = {
            status: jest.fn().mockReturnValue({
                json: jsonFn,
            }),
        };

        // When
        errorHandler(err, null, res, null);

        // Then
        expect(res.status).toBeCalledWith(httpStatus.INTERNAL_SERVER_ERROR);
        expect(jsonFn).toBeCalledWith({
            code: responseCode.SERVER_ERROR,
            msg: 'Oops! Something went wrong.',
            records: [],
        });
    });
});
