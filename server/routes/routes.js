import express from "express";
import { chats } from "../data/data.js";
import { Protected } from "../middlewares/AuthMiddleware.js";
import {
  getAllUsers,
  registerApi,
  userLogin,
} from "../controllers/Auth/register.js";

const router = express.Router();

router.get("/chats", (req, res, next) => {
  res.send(chats);
});
router.post("/registerUser", registerApi);
router.post("/loginUser", userLogin);
router.route("/").get(Protected, getAllUsers);

export default router;
