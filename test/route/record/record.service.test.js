import {
    afterEach, describe, it, jest, expect,
} from '@jest/globals';
import recordService from '../../../src/route/record/record.service';
import recordRepository from '../../../src/route/record/record.repository';
import { DB_ERROR } from '../../../src/common/error';

// mock
jest.mock('../../../src/route/record/record.repository');

describe('Record service', () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    describe('getRecordList', () => {
        it('Should return success records', async () => {
            // Given
            const startDate = new Date('2022-01-01T00:00:00.000Z');
            const endDate = new Date('2022-01-29T23:59:59.999Z');
            const minCount = 100;
            const maxCount = 800;
            const data = [
                {
                    createdAt: new Date('2022-01-28T11:47:29.706Z'),
                    key: 'hCXxyuAu',
                    totalCount: 600,
                },
            ];

            recordRepository.getRecordList = jest.fn().mockResolvedValueOnce(data);

            // When
            const records = await recordService.getRecordList(
                startDate,
                endDate,
                minCount,
                maxCount,
            );

            // Then
            expect(records).toEqual(data);
        });

        it('Should throw DB_ERROR on repository error', async () => {
            // Given
            const startDate = new Date('2022-01-01T00:00:00.000Z');
            const endDate = new Date('2022-01-29T23:59:59.999Z');
            const minCount = 100;
            const maxCount = 800;

            recordRepository.getRecordList = jest.fn().mockRejectedValueOnce(new Error('Error in DB'));

            // When and Then
            try {
                const records = await recordService.getRecordList(
                    startDate,
                    endDate,
                    minCount,
                    maxCount,
                );
                expect(records).not.toBeDefined();
            } catch (error) {
                expect(error).toBeDefined();
                expect(error).toBeInstanceOf(DB_ERROR);
            }
        });
    });
});
