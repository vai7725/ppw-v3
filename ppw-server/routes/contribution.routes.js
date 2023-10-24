import express from 'express';
import { contributePaper } from '../controllers/contribution.controller.js';
import upload from '../middlewares/multer.middleware.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

// contribution routes
router.route('/paper').post(verifyJWT, upload.single('file'), contributePaper);

export default router;
