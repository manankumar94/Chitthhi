import express from "express";
import MessageController from "../controllers/messagesController.js";

const router = express.Router();

router.post("/addmsg", MessageController.addMessage);
router.post("/getmsg", MessageController.getAllMessage);

export default router;