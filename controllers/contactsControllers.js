import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const filter = { owner };
  const fields = "-createdAt -updatedAt";
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const settings = { skip, limit };
  const result = await contactsService.listContacts({
    filter,
    fields,
    settings,
  });
  const total = await contactsService.countAllContacts(filter);
  res.json({
    total,
    result,
  });
};

const getOneContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { id: _id } = req.params;
  const result = await contactsService.getContact({ _id, owner });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await contactsService.addContact({ ...req.body, owner });
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { id: _id } = req.params;

  const result = await contactsService.updateContactById(
    { _id, owner },
    req.body
  );

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const deleteContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { id: _id } = req.params;
  const result = await contactsService.removeContact({ _id, owner });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const updateFavorites = async (req, res) => {
  const { _id: owner } = req.user;
  const { id: _id } = req.params;

  const result = await contactsService.updateContactFavorites(
    { _id, owner },
    req.body
  );

  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateFavorites: ctrlWrapper(updateFavorites),
};
