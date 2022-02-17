import moment from 'moment';
import recordRepository from './record.repository';
import { DB_ERROR } from '../../common/error';
import logger from '../../lib/logger';

/**
 * @function getRecordList get the list of records
 * that in between startDate and endDate having counts between minCount and maxCount
 * @param {Date} startDate filter start date
 * @param {Date} endDate filter end date
 * @param {Number} minCount filter min count
 * @param {Number} maxCount filter max count
 */
const getRecordList = async (
    startDate,
    endDate,
    minCount,
    maxCount,
) => {
    const startOfDate = new Date(moment(startDate).startOf('day'));
    const endOfDate = new Date(moment(endDate).endOf('day'));

    try {
        const records = await recordRepository
            .getRecordList(startOfDate, endOfDate, minCount, maxCount);
        return records;
    } catch (error) {
        logger.error(error);
        throw new DB_ERROR();
    }
};

export default {
    getRecordList,
};
