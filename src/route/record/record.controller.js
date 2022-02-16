import { Router } from 'express';
import { httpStatus } from '../../common/statusCode';
import { responseBuilder } from '../../lib/util';

const router = Router();

/**
 * Api POST /records
 * get the records of that match the given criteria
 */
router.post('/records', (req, res, next) => {
    res.status(httpStatus.OK).json(responseBuilder());
});

export default router;
