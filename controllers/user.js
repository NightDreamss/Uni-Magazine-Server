import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import PostMagazine from "../models/postMagazine.js";
import Comment from "../models/comment.js";
import express from "express";
import mongoose from "mongoose";

const router = express.Router();

export const allUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json(error);
    console.log(error.response.data);
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId(id))
    return res.status(404).send("No user found");

  await User.findByIdAndRemove(id);
  await PostMagazine.deleteMany({ creator: id });
  await Comment.deleteMany({ userId: id });
  res.json({ message: "User deleted" });
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const currentUser = await User.findOne({ email });
    if (!currentUser)
      return res.status(404).json({ message: "User does not exist." });

    const userPassword = await bcrypt.compare(password, currentUser.password);
    if (!userPassword)
      return res.status(400).json({ message: "Invalid credentials." });

    const token = jwt.sign(
      { email: currentUser.email, id: currentUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: currentUser, token });
  } catch (error) {
    res.status(500).json(error);
    console.log(error.response.data);
  }
};

export const signup = async (req, res) => {
  const { name, email, password, confirmPassword, account } = req.body;
  try {
    const currentUser = await User.findOne({ email });
    if (currentUser)
      return res.status(404).json({ message: "User already exist." });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match" });

    const salt = await bcrypt.genSalt();
    const bcrpytPassword = await bcrypt.hash(password, salt);

    const result = await User.create({
      email,
      password: bcrpytPassword,
      name,
      account,
    });
    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token, { httpOnly: true }).send();

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json(error);
    console.log(error.response.data);
  }
};

export default router;
