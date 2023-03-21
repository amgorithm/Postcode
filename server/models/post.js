import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: [
        60,
        "Title cannot exceed 60 characters, your title has {value} characters",
      ],
    },
    body: {
      type: String,
      required: true,
      maxLength: [
        650,
        "Post body cannot exceed 650 characters, your post body has {value} characters",
      ],
    },
    author: { type: mongoose.Schema.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Post", postSchema);
