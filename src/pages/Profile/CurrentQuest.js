import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Icon, Modal } from "antd";
import backImg from "assets/images/back.svg";
import clockImg from "assets/images/clock.svg";
import SimpleButton from "components/SimpleButton";
import QuestStepProgress from "components/QuestStepProgress";
import HistoryMessage from "./HistoryMessage";
import FullWidthButton from "components/FullWidthButton";
import { Dropdown, TextInput, Screenshots } from "components/FormTypes";
import HunterDashboardContext from "contexts/HunterDashboardContext";
import QuestInfo from './MakerProfile/QuestInfo';
import ReviewInfo from './MakerProfile/ReviewInfo';
import BuzzInfo from './MakerProfile/BuzzInfo';

const CurrentQuest = props => {
  const { data, onBackPressed } = props;
  const { quests } = data;
  let currentStep = 0;

  quests.forEach(({ status }, i) => {
    if (status !== null) {
      currentStep++;
    }
  });

  currentStep = Math.min(quests.length - 1, currentStep);

  const [questInfoIndex, setQuestInfoIndex] = useState(currentStep);

  const quest = quests[questInfoIndex];
  const { quest_type } = quest;

  console.log("QUEST TYPE IS", quest_type);

  return (
    <div className="current-quest">
      <div className="row-space-between">
        <div className="row-align-center hover-link" onClick={onBackPressed}>
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
        style={{ marginTop: 15, marginBottom: 30, maxWidth: 180 }}
      />

      <div className="divider" />
      <QuestStepProgress
        steps={quests}
        currentStep={currentStep}
        containerStyle={{ marginTop: 16, marginBottom: 16 }}
        onStepClicked={step => setQuestInfoIndex(step)}
      />

      {quest_type.indexOf("general") > -1 && <QuestInfo quest={quest} />}
      {quest_type === "review" && <ReviewInfo quest={quest} />}
      {quest_type === "buzz" && <BuzzInfo quest={quest} />}
    </div>
  );
};

CurrentQuest.propTypes = {
  data: PropTypes.object
};

CurrentQuest.defaultProps = {
  data: {
    steps: []
  }
};

export default CurrentQuest;
