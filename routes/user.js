import express from "express";
import { signin, signup, allUser, deleteUser } from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/", allUser);
router.delete("/:id", auth, deleteUser);

export default router;
