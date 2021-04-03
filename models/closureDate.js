import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  start: Date,
  end: Date,
  creator: String,
  dateCreated: {
    type: Date,
    default: () => new Date().toISOString(),
  },
});

export default mongoose.model("Closure", postSchema);
