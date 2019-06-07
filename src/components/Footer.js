import React from "react";

export default function Footer() {
  return (
    <div className="padded-container footer">
      <h1>REVIEWHUNT</h1>

      <div className="redirect-row">
        <div className="redirect-column">
          <a href="/">HUNT Platform</a>
          <a href="/">Steemhunt</a>
          <a href="/">Github</a>
          <a href="/">Discord</a>
          <a href="/">Email</a>
          <a href="/">Steemit Blog</a>
        </div>
        <div className="redirect-column">
          <a href="/">Terms of Service</a>
          <a href="/">Privacy Policy</a>
          <a href="/">Cookie Policy</a>
        </div>
      </div>
      
      <p>Copyright © 2019 BourbonShake Inc. All rights reserved.</p>
    </div>
  );
}
