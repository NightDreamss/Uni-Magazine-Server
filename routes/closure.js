import express from "express";
import {
  getClosureDate,
  createClosureDate,
  updateClosureDate,
  deleteClosureDate,
} from "../controllers/closure.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getClosureDate);
router.post("/", auth, createClosureDate);
router.patch("/:id", auth, updateClosureDate);
router.delete("/:id", auth, deleteClosureDate);

export default router;
