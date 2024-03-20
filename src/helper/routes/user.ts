import express from "express";
import { GetSelfuser, GetUsers } from "../controllers/user.controllers";
import { Authorization } from "../middlewares/authVerify";
const router = express.Router();

const privateRoute = express.Router()
const publicRoute = express.Router()


privateRoute.use(Authorization)

router.use(privateRoute)
router.use(publicRoute)


privateRoute.route("/get-users").get(GetUsers);
privateRoute.route("/me").get(GetSelfuser)

export default router;
