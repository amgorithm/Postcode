import React from "react";
import { NavLink, Link } from "react-router-dom";
import useUser from "../../hooks/useUser";
import "./NavBar.css";

const NavBar = () => {
  const { handleLogout, user } = useUser();

  let nav = user ? (
    <div>
      <NavLink to="/posts" className="NavBar-link left">
        Posts
      </NavLink>
      <NavLink to="" className="NavBar-link right" onClick={handleLogout}>
        Log out
      </NavLink>
    </div>
  ) : (
    <div>
      <NavLink to="/login" className="NavBar-link left">
        Log in
      </NavLink>

      <NavLink to="/signup" className="NavBar-link right">
        Sign up
      </NavLink>
    </div>
  );

  return (
    <div className="NavBar">
      <NavLink to="/" className="postcode">
        <h1>Postcode</h1>
      </NavLink>
      <div>{nav}</div>
    </div>
  );
};

export default NavBar;
