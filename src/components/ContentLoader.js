import React from "react";
import ContentLoader from "react-content-loader";

export default () => (
  <div className="content-loading-item">
    <ContentLoader
      height={470}
      width={382}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <rect x="16" y="325" rx="4" ry="4" width="160" height="13" />
      <rect x="16" y="363" rx="4" ry="4" width="350" height="8" />
      <rect x="16" y="383" rx="4" ry="4" width="350" height="8" />
      <rect x="16" y="403" rx="4" ry="4" width="350" height="8" />
      <rect x="16" y="423" rx="4" ry="4" width="240" height="8" />
      <rect x="-16" y="-118" rx="5" ry="5" width="412" height="412" />
    </ContentLoader>
  </div>
);
