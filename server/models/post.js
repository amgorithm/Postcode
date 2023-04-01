import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: [60, "Your title has exceeded the 60 characters limit."],
    },
    body: {
      type: String,
      required: true,
      maxLength: [650, "Your post has exceeded the 650 characters limit."],
    },
    author: { type: mongoose.Schema.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Post", postSchema);
