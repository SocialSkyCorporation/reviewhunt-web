import React from "react";
import { AppConsumer } from "contexts/AppContext";
import { getLoginURL } from "utils/token";
import { Link } from "react-router-dom";
import imgLogo from "assets/images/logo-rh@2x.png";

export default () => (
  <AppConsumer>
    {({ login }) => (
      <div className="header">
        <Link to="/" >
          <img className="logo" src={imgLogo} alt="logo" />
        </Link>

        <div className="header-right">
          <Link className="header-item" to="/about">
            <p>About</p>
          </Link>

          <Link className="header-item" to="/auth">
            <p>Login</p>
          </Link>

          <Link className="header-item" to="/auth">
            <p>Join</p>
          </Link>
          <Link className="header-item" to="/profile">
            <p>Profile</p>
          </Link>
        </div>
      </div>
    )}
  </AppConsumer>
);
