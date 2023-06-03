import express from "express";
import { Protected } from "../middlewares/AuthMiddleware.js";
import { accessChat } from "../controllers/ChatControllers.js";
const chatRouter = express.Router();

chatRouter.route("/createOrAccess").post(Protected, accessChat);

export default chatRouter;
