import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";

const App = () => (
  <div className="app-container">
    <div className="welcome-box">
      <div className="welcome-dialogue-container">
        <FontAwesomeIcon
          className="App-logo"
          size="2x"
          icon={solid("paintbrush")}
        />
        <p>
          Welcome to the Talkspace drawing exercise, I have had a great time
          coding it!
        </p>
        <p>Presented by Brandon Robinson</p>
      </div>
      <div className="welcome-button-container">
        <Link className="welcome-button" to="/login">
          Log In
        </Link>
        <Link className="welcome-button" to="/register">
          Register
        </Link>
      </div>
    </div>
  </div>
);

export default App;
