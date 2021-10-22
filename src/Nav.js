import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

function Nav() {
  let myStyle = { textDecoration: "none", color: "white" };
  return (
    <div className="nav">
      <ul className="nav-links">
        <Link style={myStyle} to="/">
          <li>Home</li>
        </Link>
        <Link style={myStyle} to="/create">
          <li>Create</li>
        </Link>
      </ul>
    </div>
  );
}

export default Nav;
