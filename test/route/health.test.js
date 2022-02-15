import { describe, expect, it } from '@jest/globals';
import supertest from 'supertest';
import express from 'express';
import healthRoute from '../../src/route/health';

const app = express();
app.use('/', healthRoute);

describe('Health route', () => {
    describe('GET ping', () => {
        it('should return success on ping', async () => {
            const response = await supertest(app).get('/ping').expect(200);
            expect(response.text).toBe('pong');
        });
    });
});