import { Course, Paper, University } from '../model/papers.model.js';

// University controllers
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

// courses controllers
export const saveCourse = async (req, res) => {
  try {
    const courseExist = await Course.findOne(req.body);
    if (courseExist) {
      return res
        .status(400)
        .json({ success: false, msg: `Course already exists` });
    }

    const course = await Course.create(req.body);

    if (!course) {
      return res
        .status(500)
        .json({ success: false, msg: 'Could not save course' });
    }
    course.save();
    return res
      .status(200)
      .json({ success: true, msg: 'Course saved successfully.' });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

export const fetchCourses = async (req, res) => {
  const { universityId } = req.query;
  try {
    const courses = await Course.find({ universityId });

    if (!courses) {
      return res.status(404).json({ success: false, msg: 'No courses found' });
    }
    return res.status(200).json({ success: true, courses });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

// papers controllers
