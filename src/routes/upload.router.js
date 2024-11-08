import express from 'express';
import { uploadImage } from '../controllers/upload.controller.js';
import { upload } from '../middleware/multer.js';

const router = express.Router();

router.post('/', upload.single('image'), uploadImage);

export default router;