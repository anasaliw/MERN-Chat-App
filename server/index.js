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
import { Server } from "socket.io";

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

const server = app.listen(PORT, () => {
  console.log("Server is listening at port 5000");
});

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

//io.on is used to establish the connection to client side
io.on("connection", (socket) => {
  console.log("connected to socket");
  // socket.on is to used to send userData so that a room is created using join
  socket.on("setup", (userData) => {
    console.log(userData._id);
    socket.join(userData._id);
    // Emit refers when a client is successfully connected to socket
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("Room joined: ", room);
  });

  socket.on("typing", (room) => {
    socket.in(room).emit("typing");
  });
  socket.on("stop typing", (room) => {
    socket.in(room).emit("stop typing");
  });

  socket.on("new message", (newMessageReceived) => {
    let chat = newMessageReceived.chat;
    if (!chat.users) return console.log("chat users not found");
    chat.users.forEach((user) => {
      if (user._id == newMessageReceived.sender._id) return;
      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });
});
