import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link } from "react-router-dom";
import "./index.css";

// TODO:
/* eslint-disable */
const MainNav = () => (
  <nav className="navbar">
    <div className="navbar-logo-container"><FontAwesomeIcon size="lg" icon={solid("user-secret")} /></div>
    <div className="navbar-content-container">
      <Link to="/" className='navbar-button'>Create</Link>
    </div>
  </nav>
);

export default MainNav;
