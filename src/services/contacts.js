import { ContactCollection } from '../db/models/contact.js';

async function getAllContactsFromDB({ page, perPage, sortBy, sortOrder }) {
  const limit = perPage;
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const [contacts, countedContacts] = await Promise.all([
    ContactCollection.find()
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .exec(),

    ContactCollection.countDocuments(),
  ]);

  const totalPages = Math.ceil(countedContacts / perPage);

  return {
    data: contacts,
    page,
    perPage,
    totalItems: countedContacts,
    totalPages,
    hasNextPage: totalPages > page,
    hasPreviousPage: page > 1,
  };
}

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
