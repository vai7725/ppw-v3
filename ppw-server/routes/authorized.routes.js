import express from 'express';
import { getUsersData } from '../controllers/authorized.controller.js';
import { verifyJWT, verifyPermission } from '../middlewares/auth.middleware.js';

const router = express.Router();

router
  .route('/users')
  .get(verifyJWT, verifyPermission(['ADMIN']), getUsersData);

export default router;
