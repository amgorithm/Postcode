import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getPosts } from "../../utils/postService";
import useUser from "../../hooks/useUser";

function UserPosts() {
  const { user } = useUser();
  let navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  console.log(posts);
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    async function getUserPosts() {
      const posts = await getPosts(user._id);
      setPosts(posts.posts);
    }
    getUserPosts();
  }, [user]);

  return (
    <div>
      {posts && posts.length > 0 ? (
        <article>
          {posts.map((post) => (
            <div key={post._id}>
              <div>
                <Link to={`/posts/detail/${post._id}`}>{post.title}</Link>
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
