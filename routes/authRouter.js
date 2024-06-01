import express from "express";
import authControllers from "../controllers/authControllers.js";
import { isEmpty } from "../middlewares/isEmpty.js";
import validateBody from "../decorators/validateBody.js";
import { authSignupSchema, authSigninSchema } from "../schemas/authSchemas.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmpty,
  validateBody(authSignupSchema),
  authControllers.register
);

authRouter.post(
  "/login",
  isEmpty,
  validateBody(authSigninSchema),
  authControllers.login
);

authRouter.post("/logout", authenticate, authControllers.logout);

authRouter.get("/current", authenticate, authControllers.current);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authControllers.updateAvatar
);

export default authRouter;
