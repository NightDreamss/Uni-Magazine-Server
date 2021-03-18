import PostMagazine from "../models/postMagazine.js";
import mongoose from "mongoose";

export const getMagazine = async (req, res) => {
  try {
    const postMagazine = await PostMagazine.find();
    res.status(200).json(postMagazine);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const createMagazine = async (req, res) => {
  const post = req.body;
  const newMagazine = new PostMagazine(post);
  try {
    await newMagazine.save();
    res.status(201).json(newMagazine);
  } catch (error) {
    res.status(409).json({ message: error });
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
  res.json({ message: "Post deleted" });
};

export const likeMagazine = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId(id))
    return res.status(404).send("No magazine found");

  const post = await PostMagazine.findById(id);
  const updateMagazine = await PostMagazine.findByIdAndUpdate(
    id,
    { Counter: post.Counter + 1 },
    { new: true }
  );

  res.json(updateMagazine);
};
