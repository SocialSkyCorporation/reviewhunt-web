import React from "react";

export default function Footer() {
  return (
    <div className="padded-container footer">
      <h1>REVIEWHUNT</h1>

      <div className="redirect-row">
        <div className="redirect-column">
          <a>HUNT Platform</a>
          <a>Steemhunt</a>
          <a>Github</a>
          <a>Discord</a>
          <a>Email</a>
          <a>Steemit Blog</a>
        </div>
        <div className="redirect-column">
          <a>Terms of Service</a>
          <a>Privacy Policy</a>
          <a>Cookie Policy</a>
        </div>
      </div>
      
      <p>Copyright © 2019 BourbonShake Inc. All rights reserved.</p>
    </div>
  );
}
