import React from 'react';

export default ({ onClick, text, selected }) => (
  <div onClick={onClick} className={`tab-item ${selected && 'selected'}`}>
    {text}
  </div>
);
