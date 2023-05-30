import { generateJwtToken } from "../../Utils/generateJwtToken.js";
import UserModel from "../../model/userModel.js";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";

export const registerApi = async (req, res) => {
  const { email, name, password, pic } = req.body;
  try {
    // !To Validate if all fields are received
    if (!email || !password || !name) {
      //   throw new Error("Please Enter All Fields");
      return res
        .status(400)
        .json({ status: false, message: "All Fields are required" });
    }
    const exist = await UserModel.findOne({ email: email });
    // !To Check if user Already Exist
    if (exist) {
      return res
        .status(400)
        .json({ status: false, message: "Email Already Exist" });
    }

    let user = await UserModel({
      name: name,
      email: email,
      password: email,
      pic: pic,
    });
    // Encrypting Password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    if (user) {
      const data = await user.save({ validateBeforeSave: true });
      const token = generateJwtToken(data?._id);
      return res.status(201).json({ data: data, success: true, token: token });
    }
  } catch (error) {
    return res.status(404).json({ message: error.message, success: false });
  }
};

export const userLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const find = await UserModel.findOne({ email: email });
    if (!find) {
      throw new Error("Email Address does not exist, pls signup first");
    }
    const compare = await bcrypt.compare(password, find.password);

    if (!compare) {
      throw new Error("Password does not match");
    }

    const token = generateJwtToken(find._id);
    return res.status(200).json({
      status: true,
      data: find,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, status: false });
  }
});
