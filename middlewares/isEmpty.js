import HttpError from "../helpers/HttpError.js";

export const isEmpty = (req, res, next) => {
  const { length } = Object.keys(req.body);
  if (!length) {
    return next(HttpError(400, "Body must have at least one field"));
  }
  next();
};
