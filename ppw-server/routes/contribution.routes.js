import express from 'express';
import {
  acceptPaperContribution,
  contributePaper,
  fetchContributedPapers,
} from '../controllers/contribution.controller.js';
import upload from '../middlewares/multer.middleware.js';
import { verifyJWT, verifyPermission } from '../middlewares/auth.middleware.js';

const router = express.Router();

// contribution routes
router
  .route('/paper')
  .post(verifyJWT, upload.single('file'), contributePaper)
  .get(verifyJWT, verifyPermission(['ADMIN']), fetchContributedPapers);

router
  .route('/accept-contribution/:contributionId')
  .put(verifyJWT, verifyPermission(['ADMIN']), acceptPaperContribution);

export default router;
