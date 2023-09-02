import bcrypt from 'bcrypt';

import { User } from '../model/user.model.js';

const cookieOptions = {
  secure: true,
  maxAge: 1000 * 60 * 60 * 24 * 10,
  httpOnly: true,
};

export const registerUserEmail = async (req, res, next) => {
  try {
    const user = await User.create({ email: req.app.locals.user.email });

    if (!user) {
      return res
        .status(500)
        .json({ success: false, msg: 'Could not register email' });
    }

    await user.save();
    return res
      .status(200)
      .json({ success: true, msg: 'Email registered successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

export const registerUserCredentials = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.statsu(400).json({ success: false, msg: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.redirect(301, '/register-user-email');
    }

    if (user.profileCompleted) {
      return res
        .status(400)
        .json({ success: false, msg: 'User already exists' });
    }

    await User.findOneAndUpdate(
      { email },
      { ...req.body, profileCompleted: true }
    );

    const token = user.generateToken();
    res.cookie('token', token, cookieOptions);

    return res
      .status(200)
      .json({ success: true, msg: 'User profile completed successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, msg: 'Proper credentials are required' });
    }

    const user = await User.findOne({ username }).select('+password');
    if (!user) {
      return res
        .statsu(404)
        .json({ success: false, msg: 'No user found with the username' });
    }

    if (!bcrypt.compare(password, user.password)) {
      return res
        .status(400)
        .json({ success: false, msg: "Password didn't match" });
    }

    const token = await user.generateToken();
    res.cookie('token', token, cookieOptions);

    return res
      .status(200)
      .json({ success: true, msg: 'log in successfull', token });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById({ _id: id });
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.cookie(token, null, cookieOptions);
    return res
      .status(200)
      .json({ success: true, msg: 'User logged out successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};
