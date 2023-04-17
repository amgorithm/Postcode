import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import userService from "../../utils/userService";
import useUser from "../../hooks/useUser";

function LoginPage() {
  const navigate = useNavigate();
  const { handleSignupOrLogin } = useUser();

  const [formState, setFormState] = React.useState({
    email: "",
    pw: "",
  });

  const [authErr, setAuthErr] = useState("");

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.login(formState);
      handleSignupOrLogin();
      navigate("/posts");
    } catch (err) {
      setAuthErr(
        "The email and password you have entered do not match our records"
      );
    }
  };

  return (
    <div className="LoginPage">
      <h2>Welcome back!</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <input
            type="email"
            className="form-control"
            placeholder="you@example.com"
            value={formState.email}
            name="email"
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="password"
            className="form-control"
            placeholder="password"
            value={formState.pw}
            name="pw"
            onChange={handleChange}
          />
        </div>

        <div className="login-cancel-btns">
          <button>Login</button>
          <Link to="/" style={{ color: " #A9A9A9" }} className="cancel-btn">
            Cancel
          </Link>
        </div>
      </form>

      <div className="login-err-msg">
        {authErr.length !== 0 ? <p>{authErr}</p> : null}
      </div>
    </div>
  );
}

export default LoginPage;
