import asyncHandler from "express-async-handler";
import Message from "../model/messageModel.js";
import UserModel from "../model/userModel.js";
import Chat from "../model/chatModel.js";

export const sendMessage = asyncHandler(async (req, res) => {
  const { chatId, content } = req.body;
  try {
    //This is created
    let message = await Message.create({
      chat: chatId,
      content: content,
      sender: req.user._id,
    });
    // Now we will populate this message instance
    message = await message.populate("sender", "name email pic");
    message = await message.populate("chat");
    console.log("1", message);
    message = await UserModel.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });
    console.log("2", message);

    await Chat.findByIdAndUpdate({ _id: chatId }, { latestMessage: message });
    return res.status(200).json({ success: true, data: message });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.response });
  }
});

export const fetchMessage = asyncHandler(async (req, res) => {
  try {
    const result = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.response });
  }
});
