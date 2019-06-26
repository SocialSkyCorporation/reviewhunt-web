import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

const ProgressBar = memo(({ height, progress, containerStyle, dark }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setWidth(progress);
    }, 500);
  }, [progress]);

  return (
    <div className="progress-bar" style={containerStyle}>
      <div
        className="progress-bar-empty"
        style={{ height, backgroundColor: dark ? '#8b9699' : '#e0e0e0' }}
      >
        <div
          className="progress-bar-filled"
          style={{ width: width + '%', height }}
        />
      </div>
    </div>
  );
}, ({progress: prevProgress}, {progress: nextProgress}) => prevProgress === nextProgress);

ProgressBar.propTypes = {
  height: PropTypes.number,
  progress: PropTypes.number,
  containerStyle: PropTypes.object
};

ProgressBar.defaultProps = {
  height: 0,
  progress: 0,
  containerStyle: {},
  dark: false
};

export default ProgressBar;
