import React, { useState } from "react";
import PropTypes from "prop-types";
import { Tooltip } from "antd";
import reviewImgGrey from "assets/images/review-grey.svg";
import reviewImgWhite from "assets/images/review-white.svg";
import buzzImgGrey from "assets/images/buzz-grey.svg";
import buzzImgWhite from "assets/images/buzz-white.svg";
import approvedImg from "assets/images/approved.svg";
import pendingImg from "assets/images/pending.svg";
import { questSortFunction } from "utils/helpers/campaignHelper";

const QuestStepProgress = props => {
  const {
    ended,
    completed,
    currentStep,
    steps,
    onStepClicked,
    containerStyle
  } = props;
  const [clickedIndex, setClickedIndex] = useState(currentStep);

  let buzzShouldGlow = false;
  let buzzFilled = false;

  return (
    <div
      className={`quest-step-container ${!ended && completed && "completed"}`}
      style={containerStyle}
    >
      {steps.sort(questSortFunction).map((step, index) => {
        const { quest_type, status } = step;
        let isComplete = currentStep > index;
        const animationDisabled =
          currentStep !== clickedIndex &&
          clickedIndex === index &&
          "animation-disabled";
        let isCurrentQuest = index === currentStep || clickedIndex === index;
        let toolTipText = "";
        let statusImg = null;

        if (status === "submitted") statusImg = pendingImg;
        else if (status === "request_edit") statusImg = pendingImg;
        else if (status === "approved") statusImg = approvedImg;
        else if (status === "rejected") statusImg = pendingImg;

        if (quest_type === "review") toolTipText = "Leave a review";
        else if (quest_type === "buzz") toolTipText = "Create a Buzz";
        else toolTipText = "Quest " + (index + 1);

        //current is review, next exists, and next is buzz
        if (quest_type === "buzz") {
          isCurrentQuest =
            currentStep == index ||
            (currentStep == index - 1 &&
              steps[index - 1] &&
              steps[index - 1]["quest_type"] === "review");
        }

        const isClickable = status !== null || isCurrentQuest;

        return (
          <div className="step-container" key={index}>
            <div>
              {!ended && isCurrentQuest && (
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
                  "complete"} ${isCurrentQuest && "current"} ${ended &&
                  "ended"} ${isClickable && "clickable"}`}
                onClick={() => {
                  if (isClickable) {
                    setClickedIndex(index);
                    onStepClicked(index);
                  }
                }}
              >
                <div className="quest-step-number">
                  {quest_type.indexOf("general") > -1 && index + 1}
                  {quest_type === "review" && (
                    <img
                      className="icon review"
                      src={isComplete ? reviewImgWhite : reviewImgGrey}
                      alt=""
                    />
                  )}
                  {quest_type === "buzz" && (
                    <img
                      className="icon"
                      src={isComplete ? buzzImgWhite : buzzImgGrey}
                      alt=""
                    />
                  )}
                  <img
                    className={`quest-step-icon ${(quest_type === "review" ||
                      quest_type === "buzz") &&
                      "review"}`}
                    src={statusImg}
                    alt=""
                  />
                </div>
              </div>
            </Tooltip>
            {index !== steps.length - 1 && (
              <div className={`step-divider ${isComplete && "complete"}`} />
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
