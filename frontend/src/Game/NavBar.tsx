import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <div className="navbar">
      <ul id="navbar-links">
        <li>
          <span>🌟</span>
          <Link className="link" to="game">
            Game Page
          </Link>
        </li>
        <li>
          <span>🐣</span>
          <Link className="link" to="egg">
            Easter Egg
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
