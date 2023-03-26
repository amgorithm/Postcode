import React from "react";
import { NavLink } from "react-router-dom";
import useUser from "../../hooks/useUser";
import "./NavBar.css";

const NavBar = () => {
  const { handleLogout, user } = useUser();

  let nav = user ? (
    <div>
      <span className="NavBar-welcome">WELCOME, {user.name}</span>
      &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <NavLink to="/posts">Posts</NavLink>
      &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <NavLink to="" className="NavBar-link" onClick={handleLogout}>
        Log out
      </NavLink>
    </div>
  ) : (
    <div>
      <NavLink to="/login" className="NavBar-link">
        Log in
      </NavLink>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <NavLink to="/signup" className="NavBar-link">
        Sign up
      </NavLink>
    </div>
  );

  return <div className="NavBar">{nav}</div>;
};

export default NavBar;
