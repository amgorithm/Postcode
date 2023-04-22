import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { newPost } from "../../utils/postService";
import "./AddPost.css";

function AddPost() {
  const navigate = useNavigate();
  const [createdPost, setCreatedPost] = useState({
    title: "",
    body: "",
  });

  function handleChange(e) {
    setCreatedPost({ ...createdPost, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await newPost(createdPost);
      navigate("/posts");
    } catch (error) {
      console.log(error);
    }
  };

  function isFormInvalid() {
    return !(createdPost.title && createdPost.body);
  }

  return (
    <div className="addPost">
      <h2>Add new post</h2>
      <form className="add-form" onSubmit={handleSubmit}>
        <div className="add-title">
          <div>
            <label>Title:</label>
          </div>

          <textarea
            name="title"
            value={createdPost.title}
            onChange={handleChange}
            className="add-title-txt"
            maxLength={60}
            wrap="soft"
          />
        </div>

        <div className="add-body">
          <div>
            <label>Body:</label>
          </div>

          <textarea
            name="body"
            value={createdPost.body}
            onChange={handleChange}
            className="add-body-txt"
            maxLength={650}
            wrap="soft"
          />
        </div>
        <div className="add-cancel-btns">
          <button disabled={isFormInvalid()}>Post</button>
          <Link
            to="/posts"
            style={{ color: " #A9A9A9" }}
            className="cancel-btn"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AddPost;
