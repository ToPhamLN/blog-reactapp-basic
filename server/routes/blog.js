import express from 'express';

import { verifyToken } from '../middlewares/token.js';
import { deleteBlog, getAllBlog, getBlog, postCreateBlog, putBlog } from '../controllers/blog.js';
import uploadCloud from '../middlewares/uploader.js';


const router = express.Router();

router.post('/post', verifyToken, uploadCloud.single('image'), postCreateBlog);
router.put('/edit/:blogID', verifyToken, uploadCloud.single('image'), putBlog);
router.delete('/delete/:blogID', verifyToken, deleteBlog);
router.get('/:blogID', getBlog);
router.get('/', getAllBlog);

export default router;