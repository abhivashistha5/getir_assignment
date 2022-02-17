import {
    afterEach,
    describe, expect, it, jest,
} from '@jest/globals';
import supertest from 'supertest';
import mockServer from '../__mock__/mockServer';
import recordRoute from '../../../src/route/record/record.controller';
import { responseBuilder } from '../../../src/lib/util';
import { httpStatus, responseCode } from '../../../src/common/statusCode';
import recordService from '../../../src/route/record/record.service';
import { responseMessage } from '../../../src/common/responseMessage';
import { DB_ERROR } from '../../../src/common/error';

const app = mockServer(recordRoute);

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
            const response = await supertest(app).post('/records').send({
                startDate: '2015-01-26',
                endDate: '2018-02-02',
                minCount: 100,
                maxCount: 3000,
            });

            // Then
            expect(response.status).toBe(httpStatus.OK);
            expect(response.body).toEqual(
                responseBuilder(responseCode.SUCCESS, responseMessage.SUCCESS, data),
            );
        });

        it('should return DB_ERROR error', async () => {
            // Given
            recordService.getRecordList = jest.fn().mockRejectedValue(new DB_ERROR());

            // When
            const response = await supertest(app).post('/records').send({
                startDate: '2015-01-26',
                endDate: '2018-02-02',
                minCount: 100,
                maxCount: 3000,
            });

            // Then
            expect(response.status).toBe(httpStatus.INTERNAL_SERVER_ERROR);
            expect(response.body.msg).toBe(responseMessage.DB_ERROR);
        });

        it('should return INTERNAL_SERVER_ERROR error', async () => {
            // Given
            recordService.getRecordList = jest.fn().mockRejectedValue(new Error('some error'));

            // When
            const response = await supertest(app).post('/records').send({
                startDate: '2015-01-26',
                endDate: '2018-02-02',
                minCount: 100,
                maxCount: 3000,
            });

            // Then
            expect(response.status).toBe(httpStatus.INTERNAL_SERVER_ERROR);
            expect(response.body.msg).toBe(responseMessage.SERVER_ERROR);
        });

        it('should return validation error on invalid start date', async () => {
            // Given
            recordService.getRecordList = jest.fn().mockRejectedValue(new Error('some error'));

            // When
            const response = await supertest(app).post('/records').send({
                startDate: '2015-01-26aaaa',
                endDate: '2018-02-02',
                minCount: 100,
                maxCount: 3000,
            });

            // Then
            expect(response.status).toBe(httpStatus.BAD_REQUEST);
            expect(response.body.msg).toBe('ValidationError: "startDate" must be in YYYY-MM-DD format');
        });

        it('should return validation error on invalid end date', async () => {
            // Given
            recordService.getRecordList = jest.fn().mockRejectedValue(new Error('some error'));

            // When
            const response = await supertest(app).post('/records').send({
                startDate: '2015-01-26',
                endDate: '2018-02-02aaa',
                minCount: 100,
                maxCount: 3000,
            });

            // Then
            expect(response.status).toBe(httpStatus.BAD_REQUEST);
            expect(response.body.msg).toBe('ValidationError: "endDate" must be in YYYY-MM-DD format');
        });

        it('should return validation error on invalid minCount', async () => {
            // Given
            recordService.getRecordList = jest.fn().mockRejectedValue(new Error('some error'));

            // When
            const response = await supertest(app).post('/records').send({
                startDate: '2015-01-26',
                endDate: '2018-02-02',
                minCount: -1,
                maxCount: 3000,
            });

            // Then
            expect(response.status).toBe(httpStatus.BAD_REQUEST);
            expect(response.body.msg).toBe('ValidationError: "minCount" must be greater than or equal to 0');
        });

        it('should return validation error on non numeric minCount', async () => {
            // Given
            recordService.getRecordList = jest.fn().mockRejectedValue(new Error('some error'));

            // When
            const response = await supertest(app).post('/records').send({
                startDate: '2015-01-26',
                endDate: '2018-02-02',
                minCount: 'abc',
                maxCount: 3000,
            });

            // Then
            expect(response.status).toBe(httpStatus.BAD_REQUEST);
            expect(response.body.msg).toBe('ValidationError: "minCount" must be a number');
        });

        it('should return validation error on invalid maxCount', async () => {
            // Given
            recordService.getRecordList = jest.fn().mockRejectedValue(new Error('some error'));

            // When
            const response = await supertest(app).post('/records').send({
                startDate: '2015-01-26',
                endDate: '2018-02-02',
                minCount: 100,
                maxCount: -1,
            });

            // Then
            expect(response.status).toBe(httpStatus.BAD_REQUEST);
            expect(response.body.msg).toBe('ValidationError: "maxCount" must be greater than or equal to 0');
        });

        it('should return validation error on non numeric maxCount', async () => {
            // Given
            recordService.getRecordList = jest.fn().mockRejectedValue(new Error('some error'));

            // When
            const response = await supertest(app).post('/records').send({
                startDate: '2015-01-26',
                endDate: '2018-02-02',
                minCount: 100,
                maxCount: 'abc',
            });

            // Then
            expect(response.status).toBe(httpStatus.BAD_REQUEST);
            expect(response.body.msg).toBe('ValidationError: "maxCount" must be a number');
        });

        it('should return validation error on invalid start date format', async () => {
            // Given
            recordService.getRecordList = jest.fn().mockRejectedValue(new Error('some error'));

            // When
            const response = await supertest(app).post('/records').send({
                startDate: '01-01-2015',
                endDate: '2018-02-02',
                minCount: 100,
                maxCount: 3000,
            });

            // Then
            expect(response.status).toBe(httpStatus.BAD_REQUEST);
            expect(response.body.msg).toBe('ValidationError: "startDate" must be in YYYY-MM-DD format');
        });

        it('should return validation error on invalid end date format', async () => {
            // Given
            recordService.getRecordList = jest.fn().mockRejectedValue(new Error('some error'));

            // When
            const response = await supertest(app).post('/records').send({
                startDate: '2018-02-02',
                endDate: '01-01-2015',
                minCount: 100,
                maxCount: 3000,
            });

            // Then
            expect(response.status).toBe(httpStatus.BAD_REQUEST);
            expect(response.body.msg).toBe('ValidationError: "endDate" must be in YYYY-MM-DD format');
        });
    });
});
