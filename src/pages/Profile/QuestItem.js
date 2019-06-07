import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from 'components/ProgressBar';
import clockImg from 'assets/images/clock.svg';
import QuestStepProgress from 'components/QuestStepProgress';

const QuestItem = (props) => {
  const { title, steps, currentStep, ended, onClick } = props;
  const completed = currentStep > steps.length - 1;

  return (
    <div className={`quest-item-row`} onClick={onClick}>
      <div className={`quest-item-container ${ended && 'ended'}`}>
        <div className="quest-img">
          <img src="https://picsum.photos/110" className="quest-img" alt=""/>
          <ProgressBar height={5} progress={50} />
        </div>

        <div className="quest-info">
          <div className="quest-title-container">
            <div className="quest-title">{title}</div>
            <div className="quest-time-container">
              <img className="clock-icon" src={clockImg} alt=""/>
              <div className="quest-time-left">Time left</div>
            </div>
          </div>

          <div className="quest-tag-container">
            <div className="quest-tag complete">Earned $5</div>
            {completed && <div className="quest-tag complete">Completed all quests</div>}
            {!completed && !ended && <div className="quest-tag">Grab more $15 - $150</div>}
          </div>

          <QuestStepProgress {...props}/>

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
  steps: [1, 2, 3, 'review', 'buzz'],
  currentStep: 4,
  ended: false,
  title: 'Title'
};
export default QuestItem;
