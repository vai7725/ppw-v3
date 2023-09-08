import express from 'express';
import {
  editUniversity,
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
  updatePaperViews,
} from '../controllers/papers.controller.js';
import { verifyPermission, verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

// university routes
router
  .route('/universities')
  .get(fetchUniversities)
  .post(verifyJWT, verifyPermission(['ADMIN', 'MANAGER']), saveUniversity);

router
  .route('/university/:universityId')
  .get(fetchUniversity)
  .put(verifyJWT, verifyPermission(['ADMIN']), editUniversity);

// courses routes
router.route('/courses').post(saveCourse).get(fetchCourses);

// papers routes
router.route('/papers').post(savePapers).get(fetchPapers);

router.route('/papers/:paperId').put(updatePaperViews);

router
  .route('/papers/:courseId/:exam_year/:subject_title')
  .get(fetchFilteredPapers);

// filter option routes
router.route('/exam-years/:courseId').get(fetchExamYears);

router.route('/subject-titles/:courseId/:exam_year').get(fetchSubjectTitles);

export default router;
