import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { chats } from "./data/data.js";
const app = express();
import dotenv from "dotenv";
import Connection from "./Database/Connection.js";

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(dotenv.config());

dotenv.config();
const URL = process.env.MONGO_DB;

Connection(URL);

app.get("/api/chat", (req, res, next) => {
  res.send(chats);
});
app.get("/single/:id", (req, res) => {
  const { id } = req.params;
  try {
    const response = chats.find((c) => c._id === id);
    console.log(response);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is listening at port 5000");
});
