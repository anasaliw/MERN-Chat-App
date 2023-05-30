import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { chats } from "./data/data.js";
const app = express();
import dotenv from "dotenv";
import Connection from "./Database/Connection.js";
import router from "./routes/routes.js";

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1/", router);

// app.use(dotenv.config());
dotenv.config();
const URL = process.env.MONGO_DB;

Connection(URL);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is listening at port 5000");
});
