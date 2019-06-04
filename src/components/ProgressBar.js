import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types'


const ProgressBar = ({ height, progress }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setWidth(progress);
    }, 500)
  })

  return (
    <div className="progress-bar">
      <div className="progress-bar-empty" style={{ height }}>
        <div
          className="progress-bar-filled"
          style={{ width: width + '%', height }}
        />
      </div>
    </div>
  );
};


ProgressBar.propTypes = {
  height: PropTypes.number,
  progress: PropTypes.number
}

ProgressBar.defaultProps = {
  height: 0,
  progress: 0
}

export default ProgressBar;
