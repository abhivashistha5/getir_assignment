import { Router } from 'express';
import { DB_ERROR } from '../../common/error';
import { responseMessage } from '../../common/responseMessage';
import { httpStatus, responseCode } from '../../common/statusCode';
import { errorBuilder, responseBuilder } from '../../lib/util';
import recordService from './record.service';

const router = Router();

/**
 * Api POST /records
 * get the records of that match the given criteria
 */
router.post('/records', (req, res, next) => {
    const startDate = new Date('2015-10-14T00:00:00.000Z');
    const endDate = new Date('2015-11-28T23:59:59.999Z');
    const minCount = 2084;
    const maxCount = 2774;

    recordService
        .getRecordList(startDate, endDate, minCount, maxCount)
        .then((records) => {
            res
                .status(httpStatus.OK)
                .json(responseBuilder(responseCode.SUCCESS, responseMessage.SUCCESS, records));
        }).catch((error) => {
            if (error instanceof DB_ERROR) {
                next(
                    errorBuilder(
                        httpStatus.INTERNAL_SERVER_ERROR,
                        responseBuilder(responseCode.DB_ERROR, responseMessage.DB_ERROR),
                    ),
                );
            } else {
                next(
                    errorBuilder(
                        httpStatus.INTERNAL_SERVER_ERROR,
                        responseBuilder(responseCode.SERVER_ERROR, responseMessage.SERVER_ERROR),
                    ),
                );
            }
        });
});

export default router;
