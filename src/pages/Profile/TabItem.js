import React from "react";

export default ({ onClick, text, selected, className, style }) => (
  <div
    onClick={onClick}
    className={`tab-item ${selected && "selected"} ${className}`}
    style={style}
  >
    {text}
  </div>
);

export const TabSubItem = ({ onClick, text, selected, className, style }) => (
  <div
    onClick={onClick}
    className={`tab-sub-item ${selected && "selected"} ${className}`}
    style={style}
  >
    <div className={`dot ${selected && "selected"}`}/>
    {text}
  </div>
);
