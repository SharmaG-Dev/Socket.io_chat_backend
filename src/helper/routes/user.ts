import express from "express";
import { GetUsers } from "../controllers/user.controllers";
const router = express.Router();

router.route("/get-users").get(GetUsers);

export default router;
