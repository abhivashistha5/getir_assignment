import {
    describe, it, expect, jest,
} from '@jest/globals';
import { httpStatus, responseCode } from '../../src/common/statusCode';
import { errorBuilder, responseBuilder } from '../../src/lib/util';
import unknownRoute from '../../src/middleware/unknownRoute';

describe('unknownRoute', () => {
    it('should send unknown route error', () => {
        // Given
        const nextFn = jest.fn();

        // When
        unknownRoute(null, null, nextFn);

        // Then
        expect(nextFn).toBeCalledWith(
            errorBuilder(httpStatus.NOT_FOUND, responseBuilder(responseCode.NOT_FOUND, 'Api not found')),
        );
    });
});
