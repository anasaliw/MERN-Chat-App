import asyncHandler from "express-async-handler";
import express from "express";
import { Protected } from "../middlewares/AuthMiddleware.js";
import { fetchMessage, sendMessage } from "../controllers/MessageController.js";
const MessageRouter = express.Router();

MessageRouter.route("/sendMessage").post(Protected, sendMessage);
MessageRouter.route("/fetchMessage/:chatId").get(Protected, fetchMessage);

export default MessageRouter;
