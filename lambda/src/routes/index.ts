import { Router } from 'express';

import testRouter from './testing';
// Init router and path
const router = Router();

router.use('/testing', testRouter)
router.use('/', (req, res) => {
    console.log(req);
    res.send("Unknown api: "+req.baseUrl)
})

// Export the base-router
export default router;
