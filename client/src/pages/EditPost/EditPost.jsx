import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPost, updatePost } from "../../utils/postService";

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
    <div>
      <form onSubmit={handleUpdate}>
        <label>Title:</label>
        <input
          name="title"
          value={post.title}
          onChange={handleChange}
          className="title"
          maxLength={60}
        />
        <label>Body:</label>
        <textarea
          name="body"
          value={post.body}
          onChange={handleChange}
          className="body"
          maxLength={650}
        />
        <button disabled={isFormInvalid()}>Add</button>
      </form>
    </div>
  );
}

export default EditPost;
