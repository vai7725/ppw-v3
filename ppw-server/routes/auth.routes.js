import express from 'express';
import {
  getUser,
  loginUser,
  logoutUser,
} from '../controllers/auth.controller.js';
import {
  registerUserCredentials,
  registerUserEmail,
} from '../controllers/auth.controller.js';
import {
  authenticateUser,
  verifyOtp,
  verifyUserProfile,
} from '../middlewares/auth.js';
import { mail } from '../middlewares/mailer.js';
const router = express.Router();

router.route('/register-user-email').post(verifyUserProfile, mail);

router.route('/verify-otp').post(verifyOtp, registerUserEmail);

router.route('/register-user-credentials').patch(registerUserCredentials);

// router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

router.route('/user').post(authenticateUser, getUser);

router.route('/logout').post(logoutUser);

export default router;
