import Contact from "../models/Contact.js";

export const listContacts = () => Contact.find();

export const getContactById = (contactId) => Contact.findById(contactId);

export const addContact = (data) => Contact.create(data);

export const updateContactById = (contactId, data) =>
  Contact.findByIdAndUpdate(contactId, data);

export const removeContact = (contactId) =>
  Contact.findByIdAndDelete(contactId);

export const updateContactFavorites = (contactId, data) =>
  Contact.findByIdAndUpdate(contactId, data);
