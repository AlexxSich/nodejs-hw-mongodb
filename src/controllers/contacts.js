import createHttpError from 'http-errors';
import * as contactsServices from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export async function getAllContacts(req, res, next) {
  // console.log(req.query);
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await contactsServices.getAllContactsFromDB({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  if (contacts.data.length === 0) {
    return next(createHttpError(404, 'Page not found'));
  }

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}

export async function getContactById(req, res, next) {
  const { id } = req.params;
  const contact = await contactsServices.getContactByIdFromDB(id);

  if (!contact) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${id}`,
    data: contact,
  });
}

export async function createContact(req, res, next) {
  const contactData = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
  };

  const newContact = await contactsServices.createContactInDB(contactData);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
}

export async function deleteContact(req, res, next) {
  const { id } = req.params;

  const contact = await contactsServices.deleteContactFromDB(id);

  if (!contact) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.status(204).end();
}

export async function patchContact(req, res, next) {
  const { id } = req.params;

  const contactData = await contactsServices.patchContactInDB(id, req.body);

  if (!contactData) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contactData,
  });
}
