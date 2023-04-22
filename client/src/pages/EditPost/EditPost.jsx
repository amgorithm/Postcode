import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getPost, updatePost } from "../../utils/postService";
import "./EditPost.css";

function EditPost() {
  const { postID } = useParams();
  let navigate = useNavigate();

  const [post, setPost] = useState({ title: "", body: "" });

  useEffect(() => {
    async function viewPost() {
      try {
        const post = await getPost(postID);
        setPost({ ...post, title: post.title, body: post.body });
      } catch (error) {
        console.error(error);
        navigate("/");
      }
    }
    viewPost();
  }, [postID]);

  function handleChange(e) {
    setPost({ ...post, [e.target.name]: e.target.value });
  }

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updatePost(post, post._id);
      navigate(`/post/detail/${post._id}`);
    } catch (error) {
      console.log(error);
    }
  };
  function isFormInvalid() {
    return post.title === "" || post.body === "";
  }

  return (
    <div className="EditPost">
      <h2>Edit post</h2>
      <form className="edit-form" onSubmit={handleUpdate}>
        <div className="edit-title">
          <div>
            <label>Title:</label>
          </div>

          <textarea
            name="title"
            value={post.title}
            onChange={handleChange}
            className="edit-title-txt"
            maxLength={60}
            wrap="soft"
          />
        </div>
        <div className="edit-body">
          <div>
            <label>Body:</label>
          </div>

          <textarea
            name="body"
            value={post.body}
            onChange={handleChange}
            className="edit-body-txt"
            maxLength={650}
            wrap="soft"
          />
        </div>
        <div className="edit-cancel-btns">
          <button disabled={isFormInvalid()}>Update</button>
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

export default EditPost;
