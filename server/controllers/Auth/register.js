import cloudinary from "../../Utils/cloudinary.js";
import { generateJwtToken } from "../../Utils/generateJwtToken.js";
import UserModel from "../../model/userModel.js";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
// import { v2 as cloudinary } from "cloudinary";

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
    let result = "";
    console.log("running");
    if (pic) {
      console.log("ok");
      result = await cloudinary.uploader.upload(pic, {
        folder: "avatars",
        width: 300,
        crop: "scale",
      });
      console.log("ok", result);
    }
    console.log(result.secure_url);
    let user = await UserModel({
      name: name,
      email: email,
      password: email,
      pic: {
        public_id: result?.public_id,
        url: result?.secure_url,
      },
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
    // throw new Error(`${error.message}`)
    return res.status(404).json({ message: error.response, success: false });
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

//! Find Users by search param
export const getAllUsers = asyncHandler(async (req, res) => {
  console.log(req.query.search);
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const user = await UserModel.find(keyword).find({
      _id: { $ne: req.user._id },
    });
    return res.status(200).json({ status: true, users: user });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
});
