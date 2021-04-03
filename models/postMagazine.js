import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  name: String,
  creator: String,
  desc: String,
  image: String,
  status: Boolean,
  Counter: {
    type: [String],
    default: [],
  },
  dateCreated: {
    type: Date,
    default: () => new Date().toISOString(),
  },
});

export default mongoose.model("PostMagazine", postSchema);
