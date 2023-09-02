import jwt from 'jsonwebtoken';

import { User } from '../model/user.model.js';

export const verifyUserProfile = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists && userExists.profileCompleted) {
      return res
        .status(400)
        .json({ success: false, msg: 'User already exists' });
    }

    if (userExists && !userExists.profileCompleted) {
      return res.status(201).json({
        success: false,
        redirectToCreds: true,
        msg: 'Email already verified',
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

export const verifyOtp = async (req, res, next) => {
  try {
    if (+req.body.otp !== +req.app.locals.user.otp) {
      return res.status(400).json({ success: false, msg: 'Incorrect OTP' });
    }

    if (Date.now() > +req.app.locals.user.otpExpiry) {
      req.app.locals.user = {};
      return res.status(400).json({
        success: false,
        sessionExpired: true,
        msg: 'OTP session expired',
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.msg });
  }
};

export const authenticateUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res
        .status(400)
        .json({ success: false, msg: 'Unauthenticated user' });
    }

    const tokenDetails = jwt.verify(token, process.env.JWT_SECRET);

    if (!tokenDetails) {
      return res
        .status(400)
        .json({ success: false, msg: 'Unauthenticated user' });
    }
    req.user = tokenDetails;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, msg: error.msg });
  }
};
