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

export const fetchUniversity = async (req, res) => {
  const { universityId } = req.params;
  try {
    const university = await University.findById({ _id: universityId });
    if (!university) {
      return res
        .status(404)
        .json({ success: false, msg: 'University not found' });
    }
    return res.status(200).json({ success: true, university });
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
export const savePapers = async (req, res) => {
  const { subject_title, exam_year, paper_year, file_link } = req.body;
  try {
    const paperExists = await Paper.findOne({
      subject_title,
      exam_year,
      paper_year,
      file_link,
    });
    if (paperExists) {
      return res
        .status(400)
        .json({ success: false, msg: 'Paper already exists' });
    }

    const paper = await Paper.create(req.body);
    if (!paper) {
      return res
        .status(500)
        .json({ success: false, msg: 'Could not save paper' });
    }
    await paper.save();

    return res
      .status(200)
      .json({ success: true, msg: 'Paper saved successfully.' });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

export const fetchPapers = async (req, res) => {
  const { universityId, page } = req.query;
  try {
    const limit = 30;
    const skip = (+page - 1) * +limit;
    const papers = await Paper.find({ universityId }).skip(skip).limit(limit);
    if (!papers) {
      return res.status(404).json({ success: false, msg: 'No papers found' });
    }

    return res.status(200).json({
      success: true,
      papers,
      papersFiltered: false,
    });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

export const fetchExamYears = async (req, res) => {
  try {
    const examYears = await Paper.distinct(`exam_year`, {
      ...req.params,
      ...req.query,
    });

    const papers = await Paper.find({ ...req.params, ...req.query });

    if (!examYears) {
      return res
        .status(404)
        .json({ success: false, msg: 'No exam_years found' });
    }

    if (!papers) {
      return res.status(404).json({ success: false, msg: 'No papers found' });
    }

    return res.status(200).json({
      success: true,
      examYears,
      papers,
      papersFiltered: true,
    });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

export const fetchSubjectTitles = async (req, res) => {
  try {
    const paperTitles = await Paper.distinct(`subject_title`, {
      ...req.params,
      ...req.query,
    });

    const papers = await Paper.find({ ...req.params, ...req.query });

    if (!paperTitles) {
      return res.status(404).json({ success: false, msg: 'No titles found' });
    }

    if (!papers) {
      return res.status(404).json({ success: false, msg: 'No papers found' });
    }

    return res.status(200).json({
      success: true,
      paperTitles,
      papers,
      papersFiltered: true,
    });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};

export const fetchFilteredPapers = async (req, res) => {
  try {
    const papers = await Paper.find({
      ...req.params,
      ...req.query,
    });

    if (!papers) {
      return res.status(404).json({ success: false, msg: 'No papers found' });
    }

    return res.status(200).json({
      success: true,
      papers,
      papersFiltered: true,
    });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
};