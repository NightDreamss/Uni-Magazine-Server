import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/magazine.js";

const app = express();
dotenv.config();

app.use(express.json({ limit: "10mb", extended: true }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECT_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error));
mongoose.set("useFindAndModify", false);
