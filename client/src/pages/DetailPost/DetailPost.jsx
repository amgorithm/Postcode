import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPost, removeBlog } from "../../utils/postService";
// import useUser from "../../hooks/useUser";

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

  return (
    <div>
      {post.length !== 0 ? (
        <article>
          <div>
            <p>{post.body}</p>
          </div>
        </article>
      ) : (
        <p>There doesn't seem to be any posts here yet.</p>
      )}

      <div>
        <Link to={`/post/edit/${post._id}`}>Edit</Link>
      </div>

      <div>
        <button onClick={(e) => deleteBlog(e)}>Delete</button>
      </div>
    </div>
  );
}

export default DetailPost;
