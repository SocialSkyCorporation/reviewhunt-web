import React, { useState } from "react";
import PropTypes from "prop-types";

const FullWidthButton = ({
  text,
  style,
  onClick,
  icon,
  borderColor,
  borderWidth,
  backgroundColor,
  hoverColor,
  color,
  inverse,
  onMouseOut,
  onMouseOver
}) => {
  const [hover, setHover] = useState(false);
  const buttonStyle = { borderWidth, backgroundColor, borderColor, color, ...style };

  const inverseStyle = inverse ? { backgroundColor: color, color: backgroundColor } : {};

  const hoverStyle = hover
    ? {
        backgroundColor: inverse ? backgroundColor : hoverColor,
        color
      }
    : {};

  return (
    <div
      onMouseOver={e => {
        setHover(true);
        onMouseOver(e);
      }}
      onMouseOut={e => {
        setHover(false);
        onMouseOut(e);
      }}
      className="full-width-button"
      onClick={onClick}
      style={{ ...buttonStyle, ...inverseStyle, ...hoverStyle, ...style }}
    >
      {icon && <div className="icon">{icon}</div>}
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
  icon: null,
  borderColor: "#000",
  backgroundColor: "#000",
  hoverColor: "#0a0a0a",
  borderWidth: 1,
  color: "#fff",
  onMouseOut: () => {},
  onMouseOver: () => {}
};

export default FullWidthButton;
