import React, { useContext, useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
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
import AuthContext from "contexts/AuthContext";
import QuestInfo from "./MakerProfile/QuestInfo";
import ReviewInfo from "./MakerProfile/ReviewInfo";
import BuzzInfo from "./MakerProfile/BuzzInfo";
import { timeToX } from "utils/date";

const CurrentQuest = props => {
  const { data, onBackPressed } = props;
  const { quests } = data;
  let currentStep = 0;

  quests.forEach(({ status }, i) => {
    if (status !== null && status !== "joined") {
      currentStep++;
    }
  });

  currentStep = Math.min(quests.length - 1, currentStep);

  const [questInfoIndex, setQuestInfoIndex] = useState(currentStep);

  const quest = quests[questInfoIndex];
  const { id, quest_type } = quest;
  const { currentCampaign, getQuestSubmissions, submittedQuests } = useContext(HunterDashboardContext);
  const { getSocialChannels } = useContext(AuthContext);

  const {
    product_name,
    short_description,
    description,
    expires_at
  } = currentCampaign;


  console.log("quests", quests);
  console.log("submitted quests", submittedQuests);

  return useMemo(
    () => (
      <div className="current-quest">
        <div className="row-space-between">
          <div className="row-align-center hover-link" onClick={onBackPressed}>
            <img className="back-icon" src={backImg} alt="" />
            <div className="header-text">Back</div>
          </div>
          <div className="row-align-center">
            <img className="clock-icon" src={clockImg} alt="" />
            <div className="header-text">{timeToX(expires_at)}</div>
          </div>
        </div>

        <div className="text-black header-title">{product_name}</div>
        <div className="text-grey header-description">{short_description}</div>

        <Link to={`/campaigns/${currentCampaign.id}`}>
          <SimpleButton
            text="CHECK PRODUCT INFO"
            style={{ marginTop: 15, marginBottom: 30, maxWidth: 180 }}
          />
        </Link>

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
    ),
    [quest, currentCampaign, currentStep, submittedQuests]
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
