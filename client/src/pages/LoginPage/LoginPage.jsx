import React from "react";
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
      navigate("/");
    } catch (err) {
      // Use a modal
      alert("Invalid Credentials!");
    }
  };

  return (
    <div className="LoginPage">
      <header className="header-footer">Log In</header>
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="col-sm-12">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={formState.email}
              name="email"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={formState.pw}
              name="pw"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12 text-center">
            <button className="btn btn-default">Log In</button>
            &nbsp;&nbsp;&nbsp;
            <Link to="/">Cancel</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
