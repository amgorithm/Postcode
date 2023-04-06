import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getPosts } from "../../utils/postService";
import useUser from "../../hooks/useUser";
import "./UserPosts.css";

function UserPosts() {
  const { user } = useUser();
  let navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    async function getUserPosts() {
      const posts = await getPosts(user._id);
      setPosts(posts.posts);
      setUserDetails(posts.about);
    }
    getUserPosts();
  }, [user]);

  return (
    <div className="userposts-container">
      <div className="user-edit">
        <h2> {user.name} </h2>
        <Link to={`/user/edit/${user._id}`}>
          <img
            src={require("../../images/edit-button.png")}
            alt="edit"
            className="edit"
          />
        </Link>
      </div>
      <div className="about">{userDetails ? <p>{userDetails}</p> : null}</div>
      <hr className="hr" />
      <div className="new-entry">
        <Link to={`/post/new/`} className="add">
          Add{" "}
          <img
            src={require("../../images/plus.png")}
            alt="right arrow"
            className="add-nav"
          />
        </Link>
      </div>

      <div className="all-posts">
        {posts && posts.length > 0 ? (
          <article>
            {posts.map((post) => (
              <div key={post._id} className="user-post">
                <div className="title-date">
                  <Link to={`/post/detail/${post._id}`} className="post-title">
                    {post.title}
                  </Link>
                  <h4>{post.createdAt.split("T")[0]}</h4>
                </div>

                <div>
                  <p>
                    {post.body.slice(0, 80)}...{" "}
                    <Link to={`/post/detail/${post._id}`} className="body">
                      Read more
                    </Link>{" "}
                  </p>
                </div>
                <hr className="hr" />
              </div>
            ))}
          </article>
        ) : (
          <p>There doesn't seem to be any posts here yet.</p>
        )}
      </div>
    </div>
  );
}

export default UserPosts;
