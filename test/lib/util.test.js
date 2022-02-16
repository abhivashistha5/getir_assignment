import { describe, expect, it } from '@jest/globals';
import { responseCode } from '../../src/common/statusCode';
import { errorBuilder, responseBuilder } from '../../src/lib/util';

describe('Util', () => {
    describe('responseBuilder', () => {
        it('should return formatted response with mentioned values', () => {
            // Given
            const code = responseCode.SUCCESS;
            const successMessage = 'Success Message';
            const data = [1, 2];

            // When
            const response = responseBuilder(code, successMessage, data);

            // Then
            expect(response).toBeDefined();
            expect(response.code).toBe(code);
            expect(response.msg).toBe(successMessage);
            expect(response.records).toEqual(data);
        });

        it('should return formatted response with default success message', () => {
            // Given
            const code = responseCode.SUCCESS;
            const data = [1, 2];

            // When
            const response = responseBuilder(code, undefined, data);

            // Then
            expect(response).toBeDefined();
            expect(response.code).toBe(code);
            expect(response.msg).toBe('Success');
            expect(response.records).toEqual(data);
        });

        it('should return formatted response with empty records array', () => {
            // Given
            const code = responseCode.SUCCESS;
            const successMessage = 'Success Message';

            // When
            const response = responseBuilder(code, successMessage);

            // Then
            expect(response).toBeDefined();
            expect(response.code).toBe(code);
            expect(response.msg).toBe(successMessage);
            expect(response.records).toEqual([]);
        });

        it('should return formatted response with default success status', () => {
            // Given
            const successMessage = 'Success Message';

            // When
            const response = responseBuilder(undefined, successMessage);

            // Then
            expect(response).toBeDefined();
            expect(response.code).toBe(responseCode.SUCCESS);
            expect(response.msg).toBe(successMessage);
            expect(response.records).toEqual([]);
        });
    });

    describe('errorBuilder', () => {
        it('should return formatted error object', () => {
            // Given
            const code = responseCode.SERVER_ERROR;
            const response = { dummy: 'response' };

            // When
            const error = errorBuilder(code, response);

            // Then
            expect(error).toBeDefined();
            expect(error.statusCode).toBe(code);
            expect(error.response).toEqual(response);
        });
    });
});
