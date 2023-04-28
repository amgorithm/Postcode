import React from "react";
import { Link, useNavigate } from "react-router-dom";
import userService from "../../utils/userService";
import useUser from "../../hooks/useUser";
import "./SignupForm.css";

function SignupForm({ updateMessage }) {
  const navigate = useNavigate();
  const { handleSignupOrLogin } = useUser();

  const [state, setState] = React.useState({
    name: "",
    email: "",
    password: "",
    passwordConf: "",
  });

  const handleChange = (e) => {
    updateMessage("");
    setState((oldState) => ({
      ...oldState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.signup(state);
      handleSignupOrLogin();
      navigate("/posts");
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const isFormInvalid = () => {
    return !(
      state.name &&
      state.email &&
      state.password === state.passwordConf
    );
  };

  return (
    <div className="SignupForm">
      <h2>Get started</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={state.name}
            name="name"
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={state.email}
            name="email"
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={state.password}
            name="password"
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            value={state.passwordConf}
            name="passwordConf"
            onChange={handleChange}
          />
        </div>

        <div className="signup-cancel-btns">
          <button className="btn btn-default" disabled={isFormInvalid()}>
            Sign Up
          </button>
          <Link to="/" style={{ color: " #A9A9A9" }} className="cancel-btn">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
