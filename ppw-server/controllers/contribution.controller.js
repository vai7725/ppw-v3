import cloudinary from 'cloudinary';
import fs from 'fs/promises';

import { Contribution } from '../model/contribution.model.js';

// contribution controller
export const contributePaper = async (req, res) => {
  try {
    const paper = await Contribution.create({
      ...req.body,
      file: 'dummy link',
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
          await fs.rm(`uploads/${req.file.filename}`);
        }
      } catch (error) {
        return res
          .status(500)
          .json({ success: false, msg: 'File not uploaded. Try again' });
      }
    }

    return res
      .status(200)
      .json({ success: true, msg: 'Paper create successfully', paper });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};
