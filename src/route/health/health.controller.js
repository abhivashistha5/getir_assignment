import { Router } from 'express';
import { httpStatus } from '../../common/statusCode';

const router = Router();

/**
 * @api {get} /health/ping Health check api
 * @apiName ping
 * @apiGroup health
 * @apiVersion 1.0.0
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     pong
 */
router.get('/ping', (req, res) => {
    res.status(httpStatus.OK).end('pong');
});

export default router;
