import bcrypt from "bcrypt";
import Users from "../models/Users.js";

export const findUser = (filter) => Users.findOne(filter);

export const saveUser = async (data) => {
  const hashPassword = await bcrypt.hash(data.password, 10);
  return Users.create({ ...data, password: hashPassword });
};

export const updateUser = (filter, data) =>
  Users.findOneAndUpdate(filter, data);
