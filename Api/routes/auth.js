import express from "express";
import {
  registerController,
  loginController,
  logoutController,
  reFetchUserController,
} from "../controllers/authController.js";
import { model } from "mongoose";

const router = express.Router();
router.post("/register", registerController);

router.post("/login", loginController);

router.get("/logout", logoutController);

router.get("/refetch", reFetchUserController);

export default router;
