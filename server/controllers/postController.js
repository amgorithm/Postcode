import Post from "../models/post.js";
import User from "../models/user.js";
import { CastError } from "mongoose";

async function createPost(req, res, next) {
  const userId = req.user._id;
  const data = req.body;
  try {
    const user = await User.findById(userId, "posts");
    const createdPost = await Post.create({ ...data, author: userId });
    user.posts.push(createdPost._id);
    await user.save();
    res.json(createdPost);
  } catch (error) {
    // res.status(400).send({ error: "You must provide a title and body. " });
    res.status(400).json(error);
  }
}

async function getAllPosts(req, res, next) {
  try {
    const posts = await User.findById(req.params.id).populate("posts");
    if (posts) {
      res.json(posts);
    } else {
      res.status(400).json({ error: true, message: "Post not found." });
    }
  } catch (error) {
    if (error instanceof CastError) {
      res.status(400).send({ error: "Invalid id - check the id again." });
    } else {
      next(error);
    }
  }
}

async function getAPost(req, res, next) {
  try {
    const post = await Post.findById(req.params.id).populate("author");

    if (post) {
      res.json(post);
    } else {
      res.status(400).json({ error: true, message: "Post not found." });
    }
  } catch (error) {
    if (error instanceof CastError) {
      res.status(400).send({ error: "Invalid id - check the id again." });
    } else {
      next(error);
    }
  }
}

async function updatePost(req, res, next) {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedPost);
  } catch (error) {
    next(error);
  }
}

async function deletePost(req, res, next) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Post not found");
    }

    const userId = req.user._id;

    const user = await User.findById(userId);

    const index = user.posts.findIndex(
      (postId) => postId.toString() === req.params.id
    );

    user.posts.splice(index, 1);
    await user.save();

    await Post.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export default {
  createPost,
  getAllPosts,
  getAPost,
  updatePost,
  deletePost,
};
