import { ContactCollection } from '../db/models/contact.js';

async function getAllContactsFromDB({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
}) {
  const limit = perPage;
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactQuery = ContactCollection.find();
  const count = await ContactCollection.find()
    .merge(contactQuery)
    .countDocuments();

  if (filter.contactType) {
    contactQuery.where('contactType').equals(filter.contactType);
  }

  if (filter.isFavourite) {
    contactQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [contacts] = await Promise.all([
    contactQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .exec(),
  ]);

  console.log(count);

  const totalPages = Math.ceil(count / perPage);

  return {
    data: contacts,
    page,
    perPage,
    totalItems: count,
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
