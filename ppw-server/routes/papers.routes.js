import express from 'express';
import {
  fetchUniversities,
  saveUniversity,
} from '../controllers/papers.controller.js';

const router = express.Router();

router.route('/university').post(saveUniversity).get(fetchUniversities);

export default router;
