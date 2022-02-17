import { describe, expect, it } from '@jest/globals';
import supertest from 'supertest';
import healthRoute from '../../../src/route/health/health.controller';
import { httpStatus } from '../../../src/common/statusCode';
import mockServer from '../__mock__/mockServer';

const app = mockServer(healthRoute);

describe('Health controller', () => {
    describe('GET ping', () => {
        it('should return success on ping', async () => {
            // When
            const response = await supertest(app).get('/ping').expect(httpStatus.OK);

            // Then
            expect(response.text).toBe('pong');
        });
    });
});
