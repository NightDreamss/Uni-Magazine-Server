import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  magazineId: { type: String, require: true },
  userName: { type: String, required: true },
  userId: { type: String, required: true },
  dateCreated: {
    type: Date,
    default: () => new Date().toISOString(),
  },
  comment: { type: String, required: true },
  id: { type: String },
});

export default mongoose.model("Comment", postSchema);
