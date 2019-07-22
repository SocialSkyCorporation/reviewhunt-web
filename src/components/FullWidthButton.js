import React, { useState } from "react";
import { Icon } from "antd";
import PropTypes from "prop-types";

const FullWidthButton = ({
  text,
  style,
  onClick,
  disabled,
  icon,
  borderColor,
  borderWidth,
  backgroundColor,
  hoverColor,
  color,
  inverse,
  loading,
  onMouseOut,
  onMouseOver
}) => {
  const [hover, setHover] = useState(false);
  const buttonStyle = {
    borderWidth,
    backgroundColor,
    borderColor,
    color,
    ...style
  };

  const inverseStyle = inverse
    ? { backgroundColor: color, color: backgroundColor }
    : {};

  const hoverStyle = hover
    ? {
        backgroundColor: inverse ? backgroundColor : hoverColor,
        color
      }
    : {};

  return (
    <div
      onMouseOver={e => {
        if(disabled) return;
        setHover(true);
        onMouseOver(e);
      }}
      onMouseOut={e => {
        if(disabled) return;
        setHover(false);
        onMouseOut(e);
      }}
      className="full-width-button"
      onClick={() => {
        if(disabled) return;
        !loading && onClick();
      }}
      style={{ ...buttonStyle, ...inverseStyle, ...hoverStyle, ...style }}
    >
      {icon && <div className="icon">{icon}</div>}
      {loading ? <Icon type="loading" /> : text}
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
  loading: false,
  color: "#fff",
  onMouseOut: () => {},
  onMouseOver: () => {},
  disabled: false
};

export default FullWidthButton;
