import express from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  patchContact,
} from '../controllers/contacts.js';

import { contactSchema, updateContactSchema } from '../validations/contacts.js';
import { validateBody } from '../middleware/validateBody.js';

import { isValidId } from '../middleware/isValidId.js';

import { authenticate } from '../middleware/authenticate.js';

const contactsRouter = express.Router();
const jsonParser = express.json();

contactsRouter.get('/', (req, res) => {
  res.json('Вітаємо вас на сторінці контактів');
});

contactsRouter.use(authenticate);

contactsRouter.get('/contacts', ctrlWrapper(getAllContacts));

contactsRouter.get('/contacts/:id', isValidId, ctrlWrapper(getContactById));

contactsRouter.post(
  '/contacts',
  jsonParser,
  validateBody(contactSchema),
  ctrlWrapper(createContact),
);

contactsRouter.delete('/contacts/:id', isValidId, ctrlWrapper(deleteContact));

contactsRouter.patch(
  '/contacts/:id',
  isValidId,
  jsonParser,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContact),
);

export default contactsRouter;
