import express from "express";
import * as userController from "../../controllers/userController.js";
import postController from "../../controllers/postController.js";
import { checkAuth } from "../../middleware/auth.js";

const router = express.Router();
/*---------- Public Routes ----------*/
router.post("/signup", userController.signup);
router.post("/login", userController.login);

router
  .route("/:id")
  .get(postController.getAllPosts)
  .patch(checkAuth, userController.updateUserAbout);

export default router;
