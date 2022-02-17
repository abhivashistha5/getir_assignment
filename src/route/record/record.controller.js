import { Router } from 'express';
import validator from '../../middleware/requestValidator';
import { DB_ERROR } from '../../common/error';
import { responseMessage } from '../../common/responseMessage';
import { httpStatus, responseCode } from '../../common/statusCode';
import { errorBuilder, responseBuilder } from '../../lib/util';
import recordService from './record.service';
import { getRecordListValidation } from './record.validation';

const router = Router();

/**
 * Api POST /records
 * get the records of that match the given criteria
 *
 * payload
 *  startDate   Date    filter start date
 *  endDate     Date    filter end date
 *  minCount    Number  count lower bound
 *  maxCount    Number  count upper bound
 *
 * returns
 *  records     Array   list of the records
 */
router.post('/records', validator.body(getRecordListValidation), (req, res, next) => {
    const {
        startDate, endDate, minCount, maxCount,
    } = req.body;

    recordService
        .getRecordList(startDate, endDate, minCount, maxCount)
        .then((records) => {
            res
                .status(httpStatus.OK)
                .json(responseBuilder(responseCode.SUCCESS, responseMessage.SUCCESS, records));
        })
        .catch((error) => {
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
