import React from "react";
import { AppConsumer } from "contexts/AppContext";
import { Link } from "react-router-dom";
import imgLogo from "assets/images/logo-rh@2x.png";

export default () => (
  <AppConsumer>
    {({ login }) => (
      <div className="header">
        <Link to="/">
          <img className="logo" src={imgLogo} alt="logo" />
        </Link>

        <div className="header-right">
          <Link className="header-item" to="/about">
            About
          </Link>

          <Link className="header-item" to="/auth">
            Login
          </Link>

          <Link className="header-item" to="/auth">
            Join
          </Link>
          <Link className="header-item" to="/profile">
            Profile
          </Link>
        </div>
      </div>
    )}
  </AppConsumer>
);
