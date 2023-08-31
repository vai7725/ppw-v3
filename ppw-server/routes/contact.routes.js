import express from 'express';
import {
  contactHandler,
  getContactQueries,
} from '../controllers/contact.controller.js';

const router = express.Router();

router.route('/').post(contactHandler).get(getContactQueries);

export default router;
