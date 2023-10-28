import cloudinary from 'cloudinary';
import fs from 'fs/promises';

import { Contribution } from '../model/contribution.model.js';
import { User } from '../model/user.model.js';

// contribution controller
export const contributePaper = async (req, res) => {
  try {
    const paper = await Contribution.create({
      ...req.body,
      file: 'dummy link',
      uploaded_by: { userId: req.user?._id, username: req.user?.username },
    });

    if (!paper) {
      return res
        .status(500)
        .json({ success: false, msg: 'Could not store paper' });
    }

    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: 'ppw-contributions',
        });
        if (result) {
          paper.file = result.secure_url;
          await paper.save();
          await fs.rm(`tmp/${req.file.filename}`);
        }
      } catch (error) {
        return res
          .status(500)
          .json({ success: false, msg: 'File not uploaded. Try again' });
      }
    }

    return res
      .status(200)
      .json({ success: true, msg: 'Paper stored successfully', paper });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

export const fetchContributedPapers = async (req, res) => {
  try {
    const paper = await Contribution.find({ accepted: { $ne: true } });

    if (!paper) {
      return res
        .status(500)
        .json({ success: false, msg: 'Could not store paper' });
    }

    return res.status(200).json({ success: true, paper });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

export const acceptPaperContribution = async (req, res) => {
  const { contributionId } = req.params;
  const { userId } = req.query;

  try {
    const contribution = await Contribution.findById(contributionId);
    const user = await User.findById(userId);

    if (!contribution || !user) {
      return res
        .status(500)
        .json({ success: false, msg: 'Could not find contribution or user' });
    }

    contribution.accepted = true;
    user.contribution_points += 5;

    await contribution.save();
    await user.save();

    return res.status(200).json({
      success: true,
      msg: 'Contribution accepted',
      contributionId: contribution._id,
    });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};
