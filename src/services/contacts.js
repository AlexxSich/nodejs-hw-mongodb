import { ContactCollection } from '../db/models/contact.js';

const getAllContactsFromDB = () => ContactCollection.find();

const getContactByIdFromDB = (contactId) =>
  ContactCollection.findById(contactId);

const createContactInDB = (contactData) =>
  ContactCollection.create(contactData);

const deleteContactFromDB = (contactId) =>
  ContactCollection.findByIdAndDelete(contactId);

const patchContactInDB = (contactId, contactData) =>
  ContactCollection.findByIdAndUpdate(contactId, contactData, { new: true });

export {
  getAllContactsFromDB,
  getContactByIdFromDB,
  createContactInDB,
  deleteContactFromDB,
  patchContactInDB,
};
