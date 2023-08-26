import { University } from '../model/papers.model.js';

export const saveUniversity = async (req, res) => {
  const { title } = req.body;
  try {
    const universityExists = await University.findOne({ title });
    if (universityExists) {
      return res.status(400).json({
        success: false,
        msg: `University already exists with title - ${title}`,
      });
    }

    const university = await University.create(req.body);
    if (!university) {
      return res
        .status(500)
        .json({ success: false, msg: 'Could not create university' });
    }

    await university.save();
    return res
      .status(200)
      .json({ success: true, msg: 'University saved successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

export const fetchUniversities = async (req, res) => {
  try {
    const universities = await University.find();
    if (!universities) {
      return res.status(404).json({
        success: false,
        msg: `No universities found`,
      });
    }
    return res.status(200).json({
      success: true,
      msg: 'Universities fetch successfully',
      universities,
    });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};
