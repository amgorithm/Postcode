import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <Link to="/about" style={{ textDecoration: "none" }}>
        <h2>About</h2>
      </Link>
    </div>
  );
}

export default Footer;
