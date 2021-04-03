import ClosureDate from "../models/closureDate.js";
import mongoose from "mongoose";
import express from "express";

const router = express.Router();

export const getClosureDate = async (req, res) => {
  try {
    const getClosure = await ClosureDate.find();
    res.status(200).json(getClosure);
  } catch (error) {
    res.status(404).json(error);
    console.log(error.response.data);
  }
};

export const createClosureDate = async (req, res) => {
  const closure = req.body;
  const postClosure = new ClosureDate({
    ...closure,
    creator: req.userId,
    date: new Date().toISOString(),
  });

  try {
    await postClosure.save();
    res.status(201).json(postClosure);
  } catch (error) {
    res.status(409).json(error);
    console.log(error.response.data);
  }
};

export const updateClosureDate = async (req, res) => {
  const { id: _id } = req.params;
  const closure = req.body;

  if (!mongoose.Types.ObjectId(_id))
    return res.status(404).send("No closureDate found");

  const updateClosureDate = await ClosureDate.findByIdAndUpdate(
    _id,
    { ...closure, _id },
    {
      new: true,
    }
  );
  res.json(updateClosureDate);
};

export const deleteClosureDate = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId(id))
    return res.status(404).send("No magazine found");

  await ClosureDate.findByIdAndRemove(id);
  res.json({ message: "Closure Removed" });
};

export default router;
