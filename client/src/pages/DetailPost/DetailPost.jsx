import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPost, removeBlog } from "../../utils/postService";
// import useUser from "../../hooks/useUser";
import "./DetailPost.css";

function DetailPost() {
  // const { user } = useUser();
  const { postID } = useParams();
  let navigate = useNavigate();

  const [post, setPost] = useState([]);

  useEffect(() => {
    async function viewPost() {
      try {
        const post = await getPost(postID);
        setPost(post);
      } catch (error) {
        console.error(error);
        navigate("/");
      }
    }
    viewPost();
  }, [postID]);

  function deleteBlog(e) {
    e.preventDefault();
    removeBlog(post._id);
    navigate("/");
  }

  console.log(post);

  return (
    <div className="post-container">
      {post.length !== 0 ? (
        <article>
          <div className="post-detail-title">
            <h2 className="title">{post.title}</h2>
          </div>
          <div className="date-modify">
            <h2 className="date">{post.createdAt.split("T")[0]}</h2>

            <div className="modify-btns">
              <Link to={`/post/edit/${post._id}`}>
                <img
                  src={require("../../images/edit-button.png")}
                  alt="edit"
                  className="edit"
                />
              </Link>

              <button onClick={(e) => deleteBlog(e)} className="delete">
                <img
                  src={require("../../images/trash.png")}
                  alt="trash"
                  className="trash"
                />
              </button>
            </div>
          </div>
          <div className="post-body">
            <p>{post.body}</p>
          </div>
        </article>
      ) : (
        <p>There doesn't seem to be any posts here yet.</p>
      )}
    </div>
  );
}

export default DetailPost;
