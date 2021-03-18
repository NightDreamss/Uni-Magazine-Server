import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  desc: String,
  image: String,
  student: String,
  status: Boolean,
  Counter: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

const PostMagazine = mongoose.model("PostMagazine", postSchema);

export default PostMagazine;
