import express from 'express';
import {
  forgotPasswordRequest,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  resetForgottenPassword,
  verifyEmail,
  verifyForgotPasswordLink,
} from '../controllers/auth.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/verify-email/:verificationToken').get(verifyEmail);

// router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

router.route('/user').post(verifyJWT, getUser);

router.route('/logout').post(verifyJWT, logoutUser);

router.route('/forgot-password').post(forgotPasswordRequest);

router.route('/verify-reset-link/:resetToken').get(verifyForgotPasswordLink);

router.route('/reset-password').post(resetForgottenPassword);

export default router;
