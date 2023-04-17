import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <div>
      <div>
        <form className="addPost" onSubmit={handleSubmit}>
          <label>Title:</label>
          <input
            name="title"
            value={createdPost.title}
            onChange={handleChange}
            className="title"
            maxLength={60}
          />
          <label>Body:</label>
          <textarea
            name="body"
            value={createdPost.body}
            onChange={handleChange}
            className="body"
            maxLength={650}
          />

          <button disabled={isFormInvalid()}>Add</button>
        </form>
      </div>
    </div>
  );
}

export default AddPost;
