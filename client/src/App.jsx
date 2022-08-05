import React from "react";
import logo from "./logo.svg";
import "./App.css";

const App = () => (
  <div className="welcome-container">
    <div className="welcome-box">
      <div className="welcome-dialogue-container">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Welcome to the Talkspace drawing exercise</p>
      </div>
      <div className="welcome-button-container">
        <button className="welcome-button" type="button">
          Log In
        </button>
        <button className="welcome-button" type="button">
          Sign Up
        </button>
      </div>
    </div>
  </div>
);

export default App;
