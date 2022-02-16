import { Router } from 'express';
import { httpStatus } from '../../common/statusCode';

const router = Router();

/**
 * Api GET /ping
 */
router.get('/ping', (req, res) => {
    res.status(httpStatus.OK).end('pong');
});

export default router;
