import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import "./index.css";

// TODO:
/* eslint-disable */
const NavCreate = ({ saveDrawing, eraser, eraserActive, clearCanvas}) => (
  <nav className="navbar">
    <div className="navbar-logo-container"><FontAwesomeIcon size="lg" icon={solid("user-secret")} /></div>
    <div className="navbar-content-container">
      <button type='button' onClick={eraser} className='navbar-button'>Eraser</button>
      <button type='button' onClick={clearCanvas} className='navbar-button'>Restart</button>
      <button type='button' onClick={saveDrawing} className='navbar-button'>Save</button>
    </div>
  </nav>
);

export default NavCreate;
