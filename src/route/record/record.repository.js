import recordModel from './record.model';

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
) => recordModel.aggregate([
    {
        $match: {
            createdAt: { $gte: startDate, $lte: endDate },
        },
    },
    {
        $project: {
            _id: false,
            key: true,
            createdAt: true,
            totalCount: {
                $reduce: {
                    input: '$counts',
                    initialValue: 0,
                    in: {
                        $sum: ['$$value', '$$this'],
                    },
                },
            },
        },
    },
    {
        $match: {
            totalCount: { $gte: minCount, $lte: maxCount },
        },
    },
]).exec();

export default {
    getRecordList,
};
