import Comment from "../models/comment.js";
import express from "express";
import mongoose from "mongoose";

const router = express.Router();

export const getComments = async (req, res) => {
  try {
    const comment = await Comment.find();
    res.status(200).json(comment);
  } catch (error) {
    res.status(404).json(error);
    console.log(error.response.data);
  }
};

export const createComment = async (req, res) => {
  const comment = req.body;
  const newComment = new Comment({
    ...comment,
    date: new Date().toISOString(),
  });

  try {
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(409).json(error);
    console.log(error.response.data);
  }
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId(id))
    return res.status(404).send("No magazine found");

  await Comment.findByIdAndRemove(id);
  res.json({ message: "Comment deleted" });
};

export default router;
