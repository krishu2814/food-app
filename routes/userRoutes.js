import express from "express";
import getUserController from "../controllers/userControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// routes

// get user
router.get("/getUser", authMiddleware, getUserController);

export default router;
