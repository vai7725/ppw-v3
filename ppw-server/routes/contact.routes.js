import express from 'express';
import {
  contactHandler,
  getContactQueries,
  resolveContactQuery,
} from '../controllers/contact.controller.js';

const router = express.Router();

router.route('/').post(contactHandler).get(getContactQueries);
router.route('/resolve/:contactId').put(resolveContactQuery);

export default router;
