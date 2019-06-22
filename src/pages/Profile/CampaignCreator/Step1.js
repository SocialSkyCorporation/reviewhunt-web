import React from 'react';
import PropTypes from 'prop-types';
import {Input, Screenshot} from './FormTypes';

const Step1 = ({}) => {
    return (
        <div className="campaign-step">
        <div className="text-grey">Step 1 of 5</div>
        <div className="step-title text-black">PRODUCT DESCRIPTION</div>
        <Input/>
        <Screenshot/>
          
        </div>
    );
};

Step1.propTypes = {
   
};

Step1.defaultProps = {
   
};

export default Step1;
