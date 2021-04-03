import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import magazineRoutes from "./routes/magazines.js";
import userRoutes from "./routes/user.js";
import userComments from "./routes/comments.js";
import closureRoutes from "./routes/closure.js";

const app = express();
dotenv.config();

app.use(express.json({ limit: "10mb", extended: true }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("API For Uni Magazine M.E.R.N. Project");
});

app.use("/posts", magazineRoutes);
app.use("/user", userRoutes);
app.use("/comments", userComments);
app.use("/closure", closureRoutes);

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
