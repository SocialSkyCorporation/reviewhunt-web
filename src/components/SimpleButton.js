import React from 'react';
import PropTypes from 'prop-types';

const SimpleButton = props => {
  const { onClick, text, style } = props;

  return (
    <div className="simple-button" onClick={onClick} style={style}>
      {text}
    </div>
  );
};

SimpleButton.propTypes = {};

export default SimpleButton;
