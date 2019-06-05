import React from 'react';
import PropTypes from 'prop-types';

const FullWidthButton = ({ text, style, onClick }) => {
  return (
    <div className="full-width-button" style={style} onClick={onClick}>
      {text}
    </div>
  );
};

FullWidthButton.propTypes = {
  text: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func
};

export default FullWidthButton;
