import { ContactCollection } from '../db/models/contact.js';

async function getAllContactsFromDB({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
  userId,
}) {
  const limit = perPage;
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactQuery = ContactCollection.find();

  if (filter.contactType) {
    contactQuery.where('contactType').equals(filter.contactType);
  }

  if (filter.isFavourite) {
    contactQuery.where('isFavourite').equals(filter.isFavourite);
  }

  contactQuery.where('userId').equals(userId);

  const [count, contacts] = await Promise.all([
    ContactCollection.find().merge(contactQuery).countDocuments(),

    contactQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .exec(),
  ]);

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

const getContactByIdFromDB = (contactId, userId) =>
  ContactCollection.findOne({ _id: contactId, userId });

const createContactInDB = (contactData) =>
  ContactCollection.create(contactData);

const deleteContactFromDB = (contactId, userId) =>
  ContactCollection.findOneAndDelete({ _id: contactId, userId });

const patchContactInDB = (contactId, userId, contactData) =>
  ContactCollection.findOneAndUpdate({ _id: contactId, userId }, contactData, {
    new: true,
  });

export {
  getAllContactsFromDB,
  getContactByIdFromDB,
  createContactInDB,
  deleteContactFromDB,
  patchContactInDB,
};
