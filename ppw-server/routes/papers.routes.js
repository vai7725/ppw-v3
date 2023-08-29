import express from 'express';
import {
  fetchCourses,
  fetchExamYears,
  fetchFilteredPapers,
  fetchPapers,
  fetchSubjectTitles,
  fetchUniversities,
  fetchUniversity,
  saveCourse,
  savePapers,
  saveUniversity,
} from '../controllers/papers.controller.js';

const router = express.Router();

router.route('/universities').post(saveUniversity).get(fetchUniversities);

router.route('/universities/:universityId').get(fetchUniversity);

router.route('/courses').post(saveCourse).get(fetchCourses);

router.route('/papers').post(savePapers).get(fetchPapers);

router.route('/exam-years/:courseId').get(fetchExamYears);

router.route('/subject-titles/:courseId/:exam_year').get(fetchSubjectTitles);

router
  .route('/papers/:courseId/:exam_year/:subject_title')
  .get(fetchFilteredPapers);

export default router;
