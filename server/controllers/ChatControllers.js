import asyncHandler from "express-async-handler";
import Chat from "../model/chatModel.js";
import UserModel from "../model/userModel.js";

export const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    throw new Error("User Id is missing");
  }
  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await UserModel.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json({ success: true, data: FullChat });
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

export const fetchChat = asyncHandler(async (req, res) => {
  try {
    let result = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    result = await UserModel.populate(result, {
      path: "latestMessage.sender",
      select: "name pic email",
    });
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    throw new Error(`${error.response}`);
  }
});

export const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.chatName) {
    throw new Error("Please enter group name and group users");
  }

  const parsedUsers = JSON.parse(req.body.users);
  parsedUsers.push(req.user);
  if (parsedUsers.length < 2) {
    throw new Error("At least 3 users are allowed in group chat");
  }
  console.log("id", req.user._id);

  try {
    const created = await Chat.create({
      chatName: req.body.chatName,
      isGroupChat: true,
      users: parsedUsers,
      groupAdmin: req.user._id,
    });

    const result = await Chat.find({ _id: created._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    console.log(result);
    return res.status(201).json({ success: true, data: result });
  } catch (error) {
    return res.json(500).json({ success: false, message: error.response });
  }
});

export const renameGroup = asyncHandler(async (req, res) => {
  if (!req.body.id || !req.body.chatName) {
    throw new Error("Please make sure to provide an id and Chat Name");
  }

  try {
    const result = await Chat.findByIdAndUpdate(
      {
        _id: req.body.id,
      },
      {
        chatName: req.body.chatName,
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success: false, data: error.response });
  }
});

export const addToGroup = asyncHandler(async (req, res) => {
  const { id, userId } = req.body;

  if (!id || !userId) {
    throw new Error("Please provide user id and users to add");
  }

  try {
    const result = await Chat.findByIdAndUpdate(
      { _id: id },
      { $push: { users: userId } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success: false, data: error.message });
  }
});
export const removeFromGroup = asyncHandler(async (req, res) => {
  const { id, userId } = req.body;

  if (!id || !userId) {
    throw new Error("Please provide user id and users to add");
  }

  try {
    const result = await Chat.findByIdAndUpdate(
      { _id: id },
      { $pull: { users: userId } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success: false, data: error.message });
  }
});
