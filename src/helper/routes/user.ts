import express from "express";
import {
  CreateUserValidate,
  LoginUserValidate,
} from "../validator/user.validate";
import { RegisterUser, loginUser } from "../controllers/user.controllers";

const router = express.Router();

router.route("/create").post(CreateUserValidate, RegisterUser);
router.route("/log-in").post(LoginUserValidate, loginUser);

export default router;
