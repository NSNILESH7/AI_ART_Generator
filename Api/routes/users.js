import express from "express";

import {
    getUserController,
    updateUserController,
    byuCredits
  } from "../controllers/userController.js";

const router=express.Router();
router.get('/:userId ',getUserController);
router.put('/update/:userId',updateUserController);
router.put('/credit/:userId',byuCredits);

export default router

