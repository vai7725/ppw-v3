import express from 'express';
import {
  fetchCourses,
  fetchPapers,
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
export default router;
