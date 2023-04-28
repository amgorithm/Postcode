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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="userposts-container">
      <div className="user-edit">
        <h2> {user.name} </h2>
      </div>

      <div className="about">
        {userDetails ? (
          <p>
            {userDetails}{" "}
            <Link to={`/user/edit/${user._id}`}>
              <img
                src={require("../../images/edit-button.png")}
                alt="edit"
                className="edit-img"
              />
            </Link>
          </p>
        ) : (
          <p className="add-about">
            Add about{" "}
            <Link to={`/user/edit/${user._id}`}>
              <img
                src={require("../../images/diagonal-arrow.png")}
                alt="edit"
                className="add-about-img"
              />
            </Link>
          </p>
        )}
      </div>
      <div className="hr-line">
        <hr className="hr" />
      </div>

      <div className="new-entry">
        <Link to={`/post/new/`} className="add" style={{ color: "#4d349a" }}>
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
            {posts
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((post) => (
                <div key={post._id} className="user-post">
                  <div className="title-date">
                    <Link
                      to={`/post/detail/${post._id}`}
                      className="post-title"
                      style={{ color: "#4d349a" }}
                    >
                      {post.title}
                    </Link>
                    <h4>{post.createdAt.split("T")[0]}</h4>
                  </div>

                  <div>
                    <p>
                      {post.body.slice(0, 80)}...{" "}
                      <Link
                        to={`/post/detail/${post._id}`}
                        className="body"
                        style={{ color: "#4d349a" }}
                      >
                        Read more
                      </Link>{" "}
                    </p>
                  </div>
                  {/* <hr className="hr" /> */}
                </div>
              ))}
          </article>
        ) : (
          <p className="no-posts">
            There doesn't seem to be any posts here yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default UserPosts;
