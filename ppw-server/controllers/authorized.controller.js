import { User } from '../model/user.model.js';

export const getUsersData = async (req, res) => {
  try {
    const users = await User.find();

    if (!users) {
      return res
        .status(204)
        .json({ success: false, msg: 'Could not find users' });
    }

    return res.status(200).json({ success: true, users });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};
