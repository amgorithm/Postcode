import express from "express";
import postController from "../../controllers/postController.js";
import { checkAuth } from "../../middleware/auth.js";

const router = express.Router();

router.route("/").post(checkAuth, postController.createPost);

router
  .route("/:id")
  .get(postController.getAPost)
  .patch(checkAuth, postController.updatePost)
  .delete(checkAuth, postController.deletePost);

export default router;
