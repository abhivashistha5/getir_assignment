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
 * @api {post} /record/records Get list of records
 * @apiName records
 * @apiGroup Record
 * @apiVersion 1.0.0
 *
 * @apiParam startDate filter start date
 * @apiParam endDate filter end date
 * @apiParam minCount Minimum value for the count
 * @apiParam maxCount Maximum value for the count
 *
 * @apiSuccess {Array} records Records data
 * @apiSuccess {String} msg Success message
 * @apiSuccess {Number} code Success code 0
 *
 * @apiError {Array} records Empty array
 * @apiError {String} msg Error message
 * @apiError {Number} code Error code
                            [
                                SERVER_ERROR: 1,
                                DB_ERROR: 3,
                                BAD_REQUEST: 4
                            ]
 *
 * @apiSuccessExample {json} Success-Response:
 *  HTTP/1.1 200 OK
    {
        "code": 0,
        "msg": "Success",
        "records": [
            {
                "key": "TAKwGc6Jr4i8Z487",
                "createdAt": "2017-01-28T01:22:14.398Z",
                "totalCount": 170
            },
            {
                "key": "TAKwGc6Jr4i8Z487",
                "createdAt": "2017-01-28T01:22:14.398Z",
                "totalCount": 310
            }
        ]
    }
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
