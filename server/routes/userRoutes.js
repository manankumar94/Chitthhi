import express from "express";
import UserController from "../controllers/userControllers.js";

const router = express.Router();

router.post("/register",UserController.register);
router.post("/login", UserController.login);
router.post("/setAvatar/:id", UserController.setAvatar);
router.get("/allusers/:id", UserController.getAllUsers);

export default router;