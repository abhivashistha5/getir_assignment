import { Router } from 'express';

const router = Router();

/**
 * Health check / ping route
 */
router.get('/ping', (req, res) => {
    res.status(200).end('pong');
});

export default router;
