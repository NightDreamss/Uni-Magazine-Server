import express from "express";
import {
  getComments,
  createComment,
  deleteComment,
} from "../controllers/comment.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getComments);
router.post("/", auth, createComment);
router.delete("/:id", auth, deleteComment);
export default router;
