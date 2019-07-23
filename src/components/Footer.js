import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="padded-container footer">
      <h1>REVIEWHUNT</h1>

      <div className="redirect-row">
        <div className="redirect-column">
          <a
            href="https://token.hunt.town/"
            target="_blank"
            rel="noopener noreferrer"
          >
            HUNT Platform
          </a>
          <a
            href="https://steemhunt.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Steemhunt
          </a>
          <a
            href="https://github.com/Steemhunt"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          <a
            href="https://discord.gg/ywBqD74"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discord
          </a>
          <a
            href="mailto:admin@hunt.town"
            target="_blank"
            rel="noopener noreferrer"
          >
            Email
          </a>
          <a
            href="https://steemit.com/@steemhunt"
            target="_blank"
            rel="noopener noreferrer"
          >
            Blog
          </a>
        </div>
        <div className="redirect-column">
          <Link to="/terms">Terms of Service</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/cookie">Cookie Policy</Link>
        </div>
      </div>

      <p>Copyright © 2019 BourbonShake Inc. All rights reserved.</p>
    </div>
  );
}
