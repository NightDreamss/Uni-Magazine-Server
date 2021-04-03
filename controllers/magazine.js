import PostMagazine from "../models/postMagazine.js";
import Comment from "../models/comment.js";
import mongoose from "mongoose";
import express from "express";

const router = express.Router();

export const getMagazines = async (req, res) => {
  try {
    const postMagazine = await PostMagazine.find();
    res.status(200).json(postMagazine);
  } catch (error) {
    res.status(404).json(error);
    console.log(error.response.data);
  }
};

export const createMagazine = async (req, res) => {
  const post = req.body;
  const newMagazine = new PostMagazine({
    ...post,
    creator: req.userId,
    date: new Date().toISOString(),
  });

  try {
    await newMagazine.save();
    res.status(201).json(newMagazine);
  } catch (error) {
    res.status(409).json(error);
    console.log(error.response.data);
  }
};

export const updateMagazine = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId(_id))
    return res.status(404).send("No magazine found");

  const updateMagazine = await PostMagazine.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  );
  res.json(updateMagazine);
};

export const deleteMagazine = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId(id))
    return res.status(404).send("No magazine found");

  await PostMagazine.findByIdAndRemove(id);
  await Comment.deleteMany({ magazineId: id });

  res.json({ message: "Post deleted" });
};

export const likeMagazine = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId(id))
    return res.status(404).send("No magazine found");

  const post = await PostMagazine.findById(id);

  const index = post.Counter.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.Counter.push(req.userId);
  } else {
    post.Counter = post.Counter.filter((id) => id !== String(req.userId));
  }
  const updateMagazine = await PostMagazine.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.status(200).json(updateMagazine);
};
export default router;
