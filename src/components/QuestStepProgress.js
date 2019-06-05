import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';
import reviewImgGrey from 'assets/images/review-grey.svg';
import reviewImgWhite from 'assets/images/review-white.svg';
import buzzImgGrey from 'assets/images/buzz-grey.svg';
import buzzImgWhite from 'assets/images/buzz-white.svg';

const QuestStepProgress = ({
  ended,
  completed,
  currentStep,
  steps,
  onStepClicked,
  containerStyle
}) => {
  const [clickedIndex, setClickedIndex] = useState(currentStep);

  return (
    <div
      className={`quest-step-container ${!ended && completed && 'completed'}`}
      style={containerStyle}
    >
      {steps.map((step, index) => {
        const isComplete = currentStep > index;
        const isClickable = index <= currentStep;
        const animationDisabled =
          currentStep !== clickedIndex &&
          clickedIndex === index &&
          'animation-disabled';
        let toolTipText = '';

        if (step === 'review') toolTipText = 'Leave a review';
        else if (step === 'buzz') toolTipText = 'Create a Buzz';
        else toolTipText = 'Quest ' + (index + 1);

        return (
          <div className="step-container" key={index}>
            <div>
              {!ended && (index === currentStep || clickedIndex === index) && (
                <div className="progress-circle">
                  <div className="circle">
                    <div className="full progress-circle__slice">
                      <div
                        className={`progress-circle__fill ${animationDisabled}`}
                      />
                    </div>
                    <div className="progress-circle__slice">
                      <div
                        className={`progress-circle__fill ${animationDisabled}`}
                      />
                      <div
                        className={`progress-circle__fill progress-circle__bar animation-disabled ${animationDisabled}`}
                      />
                    </div>
                  </div>
                  <div className="progress-circle__overlay" />
                </div>
              )}
            </div>
            <Tooltip placement="bottom" title={toolTipText} visible={false}>
              <div
                className={`quest-step ${isComplete &&
                  'complete'} ${(currentStep === index ||
                  clickedIndex === index) &&
                  'current'} ${ended && 'ended'} ${isClickable && 'clickable'}`}
                onClick={() => {
                  if (isClickable) {
                    setClickedIndex(index);
                    onStepClicked(index);
                  }
                }}
              >
                {Number.isInteger(step) && index + 1}
                {step === 'review' && (
                  <img
                    className="icon review"
                    src={isComplete ? reviewImgWhite : reviewImgGrey}
                    alt=""
                  />
                )}
                {step === 'buzz' && (
                  <img
                    className="icon"
                    src={isComplete ? buzzImgWhite : buzzImgGrey}
                    alt=""
                  />
                )}
              </div>
            </Tooltip>
            {index !== steps.length - 1 && (
              <div
                className={`step-divider ${currentStep > index && 'complete'}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

QuestStepProgress.propTypes = {
  steps: PropTypes.array,
  currentStep: PropTypes.number,
  ended: PropTypes.bool,
  completed: PropTypes.bool,
  onStepClicked: PropTypes.func
};

QuestStepProgress.defaultProps = {
  steps: [],
  currentStep: 0,
  completed: false,
  ended: false,
  onStepClicked: () => {}
};

export default QuestStepProgress;
