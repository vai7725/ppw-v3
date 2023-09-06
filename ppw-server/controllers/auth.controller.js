import bcrypt from 'bcrypt';

import { User } from '../model/user.model.js';
import { sendEmail } from '../middlewares/mailer.js';
import {
  forgotPasswordMailTemplate,
  mailTemplate,
} from '../templates/mailTemplates.js';
import crypto from 'crypto';

const cookieOptions = {
  secure: process.env.NODE_ENV === 'production',
  httpOnly: true,
};

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    console.log('access' - accessToken);
    console.log('refresh' - refreshToken);
    user.refreshToken = refreshToken;

    await user.save();
    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error.message);
  }
};

export const registerUser = async (req, res) => {
  const { email, username } = req.body;

  const userExists = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (userExists) {
    return res.status(409).json({
      succcess: false,
      msg: 'User user already exist with email or username',
    });
  }

  const user = await User.create({
    ...req.body,
  });

  const { unHashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = tokenExpiry;
  await user.save();

  await sendEmail({
    email: user?.email,
    subject: 'Verify your email',
    mailContent: mailTemplate(
      user?.name,
      `http://localhost:3000/auth/verify-email/${unHashedToken}`
    ),
  });
  const createdUser = await User.findById(user._id).select(
    '-refreshToken -emailVerificationToken -emailVerificationExpiry'
  );

  if (!createdUser) {
    return res.status(500).json({
      success: false,
      msg: 'Something went wrong while creating user.',
    });
  }
  return res.status(201).json({
    success: true,
    msg: 'User registered success and verification mail sent',
    user: createdUser,
  });
};

export const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  if (!verificationToken) {
    return res
      .status(400)
      .json({ success: false, msg: 'Email verification token is missing' });
  }

  let hashedToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return res
      .status(489)
      .json({ success: false, msg: 'Token is invalid or expired' });
  }

  user.emailVerificationExpiry = undefined;
  user.emailVerificationToken = undefined;
  user.isEmailVerified = true;
  await user.save();
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );
  return res
    .status(301)
    .cookie('accessToken', accessToken, cookieOptions)
    .cookie('refreshToken', refreshToken, cookieOptions)
    .redirect(`${process.env.CLIENT_URI}`);
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  if (!username && !password) {
    return res
      .status(400)
      .json({ succcess: false, msg: 'Proper credentials are required' });
  }

  const user = await User.findOne({ username }).select('+password');

  if (!user) {
    return res.status(404).json({
      succcess: false,
      msg: `No user found with the username - ${username}`,
    });
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return res
      .status(401)
      .json({ succcess: false, msg: 'Invalid user credentials' });
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    '-refreshToken -emailVerificationToken -emailVerificationExpiry'
  );

  return res
    .status(200)
    .cookie('accessToken', accessToken, cookieOptions)
    .cookie('refreshToken', refreshToken, cookieOptions)
    .json({
      success: false,
      msg: 'User logged in successfully',
      user: loggedInUser,
    });
};

export const getUser = async (req, res) => {
  return res
    .status(200)
    .json({ success: true, msg: 'User fetched successfully', user: req.user });
};

export const logoutUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: { refreshToken: undefined },
      },
      { new: true }
    );

    return res
      .clearCookie('accessToken', cookieOptions)
      .clearCookie('refreshToken', cookieOptions)
      .status(200)
      .json({ success: true, msg: 'User logged out successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

export const forgotPasswordRequest = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      succcess: false,
      msg: `No account associated with email - ${email}`,
    });
  }

  const { unHashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  user.forgotPasswordToken = hashedToken;
  user.forgotPasswordExpiry = tokenExpiry;
  await user.save();

  await sendEmail({
    email: user?.email,
    subject: 'Password reset request',
    mailContent: forgotPasswordMailTemplate(
      user.name,
      `http://localhost:3000/auth/verify-reset-link/${unHashedToken}`
    ),
  });
  return res.status(201).json({
    success: true,
    msg: 'Reset link has been sent to the email',
  });
};

export const verifyForgotPasswordLink = async (req, res) => {
  const { resetToken } = req.params;
  if (!resetToken) {
    return res
      .status(400)
      .json({ succcess: false, msg: 'Unauthorized request' });
  }
  return res
    .status(301)
    .cookie('resetToken', resetToken, cookieOptions)
    .redirect(`${process.env.CLIENT_URI}/reset-password/${resetToken}`);
};

export const resetForgottenPassword = async (req, res) => {
  const { resetToken } = req.cookies;
  const newPassword = req.body.password;

  if (!resetToken || !newPassword) {
    return res
      .status(400)
      .json({ succcess: false, msg: 'Proper credentials required' });
  }

  let hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  const user = await User.findOne({
    forgotPasswordToken: hashedToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  }).select('+password');

  if (!user) {
    return res
      .status(489)
      .json({ success: false, msg: 'Token is invalid or expired' });
  }

  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });
  const { accessToken, refreshToken } = generateAccessAndRefreshTokens(
    user._id
  );

  return res
    .status(200)
    .cookie('accessToken', accessToken, cookieOptions)
    .cookie('refreshToken', refreshToken, cookieOptions)
    .json({ succcess: true, msg: 'Password has been reset successfully' });
};

export const resendEmailVerification = async (req, res) => {
  const user = await User.findById(req.user?._id);
  if (!user) {
    return res
      .status(404)
      .json({ succcess: false, msg: 'User does not exists' });
  }

  if (user.isEmailVerified) {
    return res
      .status(409)
      .json({ succcess: false, msg: 'Email already verified' });
  }

  const { unHashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = tokenExpiry;
  await user.save({ validateBeforeSave: false });

  try {
    await sendEmail({
      email: user?.email,
      subject: 'Verify your email',
      mailContent: mailTemplate(
        user?.name,
        `http://localhost:3000/auth/verify-email/${unHashedToken}`
      ),
    });
    return res
      .status(200)
      .json({ succcess: true, msg: 'Email has been sent successfully' });
  } catch (error) {
    return res.status(500).json({ succcess: false, msg: error.message });
  }
};
