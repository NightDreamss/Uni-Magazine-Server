import express from "express";
import {
  getMagazine,
  createMagazine,
  updateMagazine,
  deleteMagazine,
  likeMagazine,
} from "../controllers/magazine.js";

const router = express.Router();

router.get("/", getMagazine);
router.post("/", createMagazine);
router.patch("/:id", updateMagazine);
router.delete("/:id", deleteMagazine);
router.patch("/:id/likeMagazine", likeMagazine);

export default router;
