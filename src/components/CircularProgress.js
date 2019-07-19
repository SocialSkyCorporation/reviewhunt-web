import React from "react";
import PropTypes from "prop-types";
import { Icon } from "antd";

const CircularProgress = props => {
  return (
    <Icon
      type="loading"
      spin="true"
      className={`center-loading ${props.fullPage && "full-page"}`}
      style={{ fontSize: props.size || 40 }}
    />
  );
};

CircularProgress.propTypes = {
  size: PropTypes.number,
  fullPage: PropTypes.bool,
};

CircularProgress.defaultProps = {
  fullPage: true
}

export default CircularProgress;
