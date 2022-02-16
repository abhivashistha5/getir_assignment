import { describe, expect, it } from '@jest/globals';
import supertest from 'supertest';
import express from 'express';
import recordRoute from '../../../src/route/record/record.controller';
import { responseBuilder } from '../../../src/lib/util';
import { httpStatus } from '../../../src/common/statusCode';

const app = express();
app.use('/', recordRoute);

describe('Record controller', () => {
    describe('POST records', () => {
        it('should return success on ping', async () => {
            // When
            const response = await supertest(app).post('/records').expect(httpStatus.OK);

            // Then
            expect(response.body).toEqual(responseBuilder());
        });
    });
});
