import express from "express";
import UserRoutes from "./user";
import AuthRoutes from "./auth";

const router = express.Router();

router.use("/auth", AuthRoutes);
router.use("/user", UserRoutes);

export default router;
