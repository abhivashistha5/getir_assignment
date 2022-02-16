import {
    afterEach,
    describe, expect, it, jest,
} from '@jest/globals';
import supertest from 'supertest';
import express from 'express';
import recordRoute from '../../../src/route/record/record.controller';
import { responseBuilder } from '../../../src/lib/util';
import { httpStatus, responseCode } from '../../../src/common/statusCode';
import recordService from '../../../src/route/record/record.service';
import { responseMessage } from '../../../src/common/responseMessage';
import { DB_ERROR } from '../../../src/common/error';

const app = express();
app.use('/', recordRoute);

// mock service
jest.mock('../../../src/route/record/record.service');

describe('Record controller', () => {
    afterEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });

    describe('POST records', () => {
        it('should return success', async () => {
            // Given
            const data = [{
                createdAt: '2022-01-28T11:47:29.706Z',
                key: 'hCXxyuAu',
                totalCount: 600,
            }];

            recordService.getRecordList = jest.fn().mockResolvedValue(data);

            // When
            const response = await supertest(app).post('/records').expect(httpStatus.OK);

            // Then
            expect(response.body).toEqual(
                responseBuilder(responseCode.SUCCESS, responseMessage.SUCCESS, data),
            );
        });

        it('should return DB_ERROR error', async () => {
            // Given
            recordService.getRecordList = jest.fn().mockRejectedValue(new DB_ERROR());

            // When
            const response = await supertest(app).post('/records').send();

            // Then
            expect(response.status).toBe(httpStatus.INTERNAL_SERVER_ERROR);
        });

        it('should return INTERNAL_SERVER_ERROR error', async () => {
            // Given
            recordService.getRecordList = jest.fn().mockRejectedValue(new Error('some error'));

            // When
            const response = await supertest(app).post('/records').send();

            // Then
            expect(response.status).toBe(httpStatus.INTERNAL_SERVER_ERROR);
        });
    });
});
