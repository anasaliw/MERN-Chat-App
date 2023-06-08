import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { chats } from "./data/data.js";
const app = express();
import dotenv from "dotenv";
import Connection from "./Database/Connection.js";
import router from "./routes/routes.js";
import { errorHandler, notFound } from "./middlewares/ErrorMiddleware.js";
import chatRouter from "./routes/chatRoutes.js";
import MessageRouter from "./routes/messageRoutes.js";

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(express.json());
app.use("/api/v1/", router);
app.use("/api/v1/chat/", chatRouter);
app.use("/api/v1/message/", MessageRouter);
// ! this will run if any of the routes does not match
// ! OR there is some sort of error
app.use(notFound);
app.use(errorHandler);

// app.use(dotenv.config());
dotenv.config();
const URL = process.env.MONGO_DB;

Connection(URL);
console.log(process.env.PORT);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is listening at port 5000");
});
