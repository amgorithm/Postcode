import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getPosts } from "../../utils/postService";
import useUser from "../../hooks/useUser";

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
    <div>
      <div>
        <h2> {user.name} </h2>
        <Link to={`/user/edit/${user._id}`}>Edit</Link>
      </div>
      <div>{userDetails ? <p>{userDetails}</p> : null}</div>

      <div>
        <hr />
        <Link to={`/post/new/`}>New post</Link>
      </div>
      <br />
      {posts && posts.length > 0 ? (
        <article>
          {posts.map((post) => (
            <div key={post._id}>
              <div>
                <Link to={`/post/detail/${post._id}`}>{post.title}</Link>
              </div>
              <div>
                <p>{post.body}</p>
              </div>
            </div>
          ))}
        </article>
      ) : (
        <p>There doesn't seem to be any posts here yet.</p>
      )}
    </div>
  );
}

export default UserPosts;
