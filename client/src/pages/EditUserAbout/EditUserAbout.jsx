import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { updateAbout } from "../../utils/userService";
import { getPosts } from "../../utils/postService";
import useUser from "../../hooks/useUser";
import "./EditUserAbout.css";

function EditUserAbout() {
  const { user } = useUser();
  const { userID } = useParams();
  let navigate = useNavigate();

  const [userAbout, setUserAbout] = useState({ about: "" });

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    async function editAbout() {
      try {
        const about = await getPosts(userID);

        if (about.about) {
          setUserAbout({ ...userAbout, about: about.about });
        } else {
          setUserAbout({ ...userAbout, about: "" });
        }
      } catch (error) {
        console.log(error);
      }
    }

    editAbout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userID]);

  function handleChange(e) {
    setUserAbout({ ...userAbout, [e.target.name]: e.target.value });
  }

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateAbout(userAbout, userID);

      navigate(`/posts`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="EditUserAbout">
      <h2>Update your about</h2>
      <form className="about-form" onSubmit={handleUpdate}>
        <div className="modify-about">
          <div>
            <label>About:</label>
          </div>

          <textarea
            name="about"
            value={userAbout.about}
            onChange={handleChange}
            className="modify-about-txt"
            maxLength={150}
            wrap="soft"
          />
        </div>
        <div className="about-cancel-btns">
          <button>Update</button>

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

export default EditUserAbout;
