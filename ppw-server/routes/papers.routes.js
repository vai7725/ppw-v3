import express from 'express';
import {
  fetchCourses,
  fetchUniversities,
  saveCourse,
  saveUniversity,
} from '../controllers/papers.controller.js';

const router = express.Router();

router.route('/university').post(saveUniversity).get(fetchUniversities);

router.route('/courses').post(saveCourse).get(fetchCourses);

export default router;
