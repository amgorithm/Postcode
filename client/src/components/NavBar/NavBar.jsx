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
        Logout
      </NavLink>
    </div>
  ) : (
    <div>
      <NavLink to="/login" className="NavBar-link left">
        Login
      </NavLink>

      <NavLink to="/signup" className="NavBar-link right">
        Register
      </NavLink>
    </div>
  );

  return (
    <div className="NavBar">
      <NavLink to="/" className="postcode">
        <h1>Postcode</h1>
      </NavLink>
      <div className="Nav-links">{nav}</div>
    </div>
  );
};

export default NavBar;
