import React, {useState} from 'react';
import PropTypes from 'prop-types';
import backImg from 'assets/images/back.svg';
import clockImg from 'assets/images/clock.svg';
import SimpleButton from 'components/SimpleButton';
import QuestStepProgress from 'components/QuestStepProgress';

const QuestInfo = ({step}) => {
  return (
    <div>
      <div className="info-number text-black">QUEST {step}</div>
      <div className="info-title text-black">
        Become a top dog in your territory
      </div>
      <div className="quest-tag">Quest Bounty - $5</div>
      <div className="info-description text-grey">
        Take over territories and change the name of the location by following
        dog’s territorial actions. You can become a top dog in your 2km X 2km
        territory by barking the most. Once you become the top dog, you can
        change the name of the territory whatever you want. Become a top dog,
        change the name of your territory, and share the screenshot.
      </div>

      <div className="info-subheading text-black">
        YOUR SCREENSHOT MUST SHOW
      </div>
      <div className="info-description small-margin text-grey">
        1. Your dog number
        <br />
        2. Little crown on your profile photo
        <br />
        3. Entire smartphone screenshot (do not crop)
      </div>

      <div className="info-subheading text-black">SCREENSHOT EXAMPLE</div>
      <div className="full-width-button">SUBMIT YOUR SCREENSHOT</div>
    </div>
  );
};

const CurrentQuest = props => {
  const { data, onBackPressed } = props;
  const {currentStep} = data;
  const [questInfoIndex, setQuestInfoIndex] = useState(currentStep);
  return (
    <div className="current-quest">
      <div className="row-space-between">
        <div className="row-align-center back-button-container" onClick={onBackPressed}>
          <img className="back-icon" src={backImg} alt="" />
          <div className="header-text">Back</div>
        </div>
        <div className="row-align-center">
          <img className="clock-icon" src={clockImg} alt="" />
          <div className="header-text">17 days</div>
        </div>
      </div>

      <div className="text-black header-title">BARK</div>
      <div className="text-grey header-description">
        Transforms people nearby into fun barking dogs
      </div>

      <SimpleButton
        text="CHECK PRODUCT INFO"
        style={{ marginTop: 15, marginBottom: 30 }}
      />

      <div className="divider" />
      <QuestStepProgress
        steps={[1, 2, 3, 'review', 'buzz']}
        currentStep={currentStep}
        containerStyle={{ marginTop: 16, marginBottom: 16 }}
        onStepClicked={(step) => setQuestInfoIndex(step)}
      />
      <QuestInfo step={questInfoIndex + 1} />
    </div>
  );
};

CurrentQuest.propTypes = {
  data: PropTypes.object
};

CurrentQuest.defaultProps = {
  data: {
    currentStep: 1
  }
}

export default CurrentQuest;
