import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateAbout } from "../../utils/userService";
import { getPosts } from "../../utils/postService";
import useUser from "../../hooks/useUser";

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
    <div>
      <form onSubmit={handleUpdate}>
        <label>About:</label>
        <textarea
          name="about"
          value={userAbout.about}
          onChange={handleChange}
          className="body"
          maxLength={150}
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default EditUserAbout;
