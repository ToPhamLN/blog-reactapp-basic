import express from 'express';

import { getHome, postJoinin, postLogin } from '../controllers/site.js';

const router = express.Router();

router.get('/', getHome);
router.post('/joinin', postJoinin);
router.post('/login', postLogin);

export default router;