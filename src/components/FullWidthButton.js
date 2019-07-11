import React from "react";
import PropTypes from "prop-types";

const FullWidthButton = ({ text, style, onClick, icon }) => {
  return (
    <div className="full-width-button" style={style} onClick={onClick}>
    {icon && <div className="icon">
      {icon}
    </div>}
      {text}
    </div>
  );
};

FullWidthButton.propTypes = {
  text: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func
};

FullWidthButton.defaultProps = {
  icon: null
};

export default FullWidthButton;
