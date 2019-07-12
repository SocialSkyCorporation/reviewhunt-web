import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from 'components/ProgressBar';
import clockImg from 'assets/images/clock.svg';
import QuestStepProgress from 'components/QuestStepProgress';
import {isExpired, timeToX, timeUntil} from 'utils/date';

const QuestItem = (props) => {
  const {data, onClick} = props;
  const { product_name, quests, thumbnails, expires_at } = data;

  let currentStep = 0;

  quests.forEach(({ status }, i) => {
    if (status !== null) {
      currentStep++;
    }
  });

  const completed = currentStep > quests.length - 1;
  const ended = isExpired(expires_at);

  return (
    <div className={`quest-item-row`} onClick={onClick}>
      <div className={`quest-item-container ${ended && 'ended'}`}>
        <div className="quest-img">
          <img src={thumbnails && thumbnails["x1"]} className="quest-img" alt=""/>
          <ProgressBar height={5} progress={50} />
        </div>

        <div className="quest-info">
          <div className="quest-title-container">
            <div className="quest-title">{product_name}</div>
            <div className="quest-time-container">
              <img className="clock-icon" src={clockImg} alt=""/>
              <div className="quest-time-left">{timeToX(expires_at)}</div>
            </div>
          </div>

          <div className="quest-tag-container">
            <div className="quest-tag complete">Earned $5</div>
            {completed && <div className="quest-tag complete">Completed all quests</div>}
            {!completed && !ended && <div className="quest-tag">Grab more $15 - $150</div>}
          </div>

          <div className="quest-step-progress-container">
            <QuestStepProgress ended={ended} steps={quests} currentStep={currentStep}/>
          </div>

        </div>
      </div>
      <div className="divider" />
    </div>
  );
};

QuestItem.propTypes = {
  steps: PropTypes.array,
  currentStep: PropTypes.number,
  ended: PropTypes.bool,
  title: PropTypes.string
};

QuestItem.defaultProps = {
  steps: [],
  currentStep: 4,
  ended: false,
  title: 'Title'
};
export default QuestItem;
