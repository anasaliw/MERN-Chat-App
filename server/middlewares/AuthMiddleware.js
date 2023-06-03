import UserModel from "../model/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import asyncHandler from "express-async-handler";

export const Protected = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      //   console.log("token", token[1]);
      //   console.log("secret", process.env.SECRET_KEY);

      const decode = jwt.verify(token, process.env.SECRET_KEY);
      console.log("secret Passed", decode);
      req.user = await UserModel.findById({ _id: decode.id }).select(
        "-password"
      );
      console.log(req.user);
      next();
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Authorization Failed, Invalid Token",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Authorization Failed, Token Not Found",
    });
  }
});
