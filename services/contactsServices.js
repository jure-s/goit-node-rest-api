import Contact from "../models/Contact.js";

export const listContacts = (search = {}) => {
  const { filter = {}, fields = "", settings = {} } = search;
  return Contact.find(filter, fields, settings).populate(
    "owner",
    "email subscription"
  );
};

export const countAllContacts = (filter) => Contact.countDocuments(filter);

export const getContact = (filter) => Contact.findOne(filter);

export const addContact = (data) => Contact.create(data);

export const updateContactById = (filter, data) =>
  Contact.findOneAndUpdate(filter, data, { new: true });

export const removeContact = (filter) => Contact.findOneAndDelete(filter);

export const updateContactFavorites = (filter, data) =>
  Contact.findOneAndUpdate(filter, data, { new: true });