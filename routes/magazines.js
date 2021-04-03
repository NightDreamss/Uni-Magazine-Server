import express from "express";
import {
  getMagazines,
  createMagazine,
  updateMagazine,
  deleteMagazine,
  likeMagazine,
} from "../controllers/magazine.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getMagazines);
router.post("/", auth, createMagazine);
router.patch("/:id", auth, updateMagazine);
router.delete("/:id", auth, deleteMagazine);
router.patch("/:id/likeMagazine", auth, likeMagazine);

export default router;
