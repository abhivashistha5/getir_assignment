import { describe, expect, it } from '@jest/globals';
import supertest from 'supertest';
import express from 'express';
import healthRoute from '../../../src/route/health/health.controller';

const app = express();
app.use('/', healthRoute);

describe('Health controller', () => {
    describe('GET ping', () => {
        it('should return success on ping', async () => {
            // When
            const response = await supertest(app).get('/ping').expect(200);

            // Then
            expect(response.text).toBe('pong');
        });
    });
});
