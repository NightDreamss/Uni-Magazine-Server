import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  account: { type: String, require: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
});

export default mongoose.model("User", postSchema);
