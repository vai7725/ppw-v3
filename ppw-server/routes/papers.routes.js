import express from 'express';
import {
  editCourse,
  editPaper,
  editUniversity,
  fetchCourse,
  fetchCourses,
  fetchExamYears,
  fetchFilteredPapers,
  fetchPaperDetails,
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
router
  .route('/courses')
  .get(fetchCourses)
  .post(verifyJWT, verifyPermission(['ADMIN', 'MANAGER']), saveCourse);

router
  .route('/course/:courseId')
  .get(fetchCourse)
  .put(verifyJWT, verifyPermission(['ADMIN']), editCourse);

// papers routes
router
  .route('/papers')
  .get(fetchPapers)
  .post(verifyJWT, verifyPermission(['ADMIN', 'MANAGER']), savePapers);

router
  .route('/papers/:paperId')
  .get(fetchPaperDetails)
  .patch(updatePaperViews)
  .put(verifyJWT, verifyPermission(['ADMIN']), editPaper);

router
  .route('/papers/:courseId/:exam_year/:subject_title')
  .get(fetchFilteredPapers);

// filter option routes
router.route('/exam-years/:courseId').get(fetchExamYears);

router.route('/subject-titles/:courseId/:exam_year').get(fetchSubjectTitles);

export default router;
