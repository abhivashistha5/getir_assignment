import {
    describe, it, expect, afterAll, beforeAll, jest, afterEach,
} from '@jest/globals';
import mongoose from 'mongoose';
import { getInitialRecordsData } from './__mock__/record.data';
import recordRepository from '../../../src/route/record/record.repository';
import recordModel from '../../../src/route/record/record.model';

describe('Record repository', () => {
    beforeAll(async () => {
        try {
            await mongoose.connect(
                // eslint-disable-next-line no-underscore-dangle
                global.__MONGO_URI__,
                { useNewUrlParser: true, useUnifiedTopology: true },
            );
            try {
                await recordModel.bulkSave(getInitialRecordsData());
            } catch (error) {
                console.log(error);
            }
        } catch (err) {
            console.log(err);
            process.exit(1);
        }
    });

    afterAll((done) => {
        mongoose.disconnect();
        done();
    });

    afterEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    });

    describe('getRecordList', () => {
        it('Should return records matching criteria', async () => {
            // Given
            const startDate = new Date('2022-01-01T00:00:00.000Z');
            const endDate = new Date('2022-01-29T23:59:59.999Z');
            const minCount = 100;
            const maxCount = 800;

            // When
            const records = await recordRepository.getRecordList(
                startDate,
                endDate,
                minCount,
                maxCount,
            );

            // Then
            expect(records).toEqual([
                {
                    createdAt: new Date('2022-01-28T11:47:29.706Z'),
                    key: 'hCXxyuAu',
                    totalCount: 600,
                },
                {
                    createdAt: new Date('2022-01-20T12:17:29.706Z'),
                    key: 'MrcKxOwD',
                    totalCount: 310,
                },
            ]);
        });

        it('Should return empty array when date out of bound', async () => {
            // Given
            const startDate = new Date('2021-02-01T00:00:00.000Z');
            const endDate = new Date('2021-02-29T23:59:59.999Z');
            const minCount = 100;
            const maxCount = 800;

            // When
            const records = await recordRepository.getRecordList(
                startDate,
                endDate,
                minCount,
                maxCount,
            );

            // Then
            expect(records).toEqual([]);
        });

        it('Should return empty array when count out of bound', async () => {
            // Given
            const startDate = new Date('2022-01-01T00:00:00.000Z');
            const endDate = new Date('2022-01-29T23:59:59.999Z');
            const minCount = 10;
            const maxCount = 20;

            // When
            const records = await recordRepository.getRecordList(
                startDate,
                endDate,
                minCount,
                maxCount,
            );

            // Then
            expect(records).toEqual([]);
        });
    });
});
