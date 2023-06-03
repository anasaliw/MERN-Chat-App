import express from "express";
import { Protected } from "../middlewares/AuthMiddleware.js";
import {
  accessChat,
  addToGroup,
  createGroupChat,
  fetchChat,
  removeFromGroup,
  renameGroup,
} from "../controllers/ChatControllers.js";
const chatRouter = express.Router();

chatRouter.route("/createOrAccess").post(Protected, accessChat);
chatRouter.route("/fetchChat").post(Protected, fetchChat);
chatRouter.route("/createGroupChat").post(Protected, createGroupChat);
chatRouter.route("/renameGroup").put(Protected, renameGroup);
chatRouter.route("/addToGroup").put(Protected, addToGroup);
chatRouter.route("/removeFromGroup").put(Protected, removeFromGroup);

export default chatRouter;
