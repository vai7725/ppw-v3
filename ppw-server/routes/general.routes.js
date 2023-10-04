import express from 'express';
import { handleVisitUpdates } from '../controllers/general.controller.js';

const router = express.Router();

router.route('/visits').put(handleVisitUpdates);

export default router;
