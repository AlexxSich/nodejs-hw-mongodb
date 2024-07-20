import express from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  patchContact,
} from '../controllers/contacts.js';

const contactsRouter = express.Router();
const jsonParser = express.json();

contactsRouter.get('/', (req, res) => {
  res.json('Вітаємо вас на сторінці контактів');
});

contactsRouter.get('/contacts', ctrlWrapper(getAllContacts));

contactsRouter.get('/contacts/:contactId', ctrlWrapper(getContactById));

contactsRouter.post('/contacts', jsonParser, ctrlWrapper(createContact));

contactsRouter.delete('/contacts/:contactId', ctrlWrapper(deleteContact));

contactsRouter.patch(
  '/contacts/:contactId',
  jsonParser,
  ctrlWrapper(patchContact),
);

export default contactsRouter;
