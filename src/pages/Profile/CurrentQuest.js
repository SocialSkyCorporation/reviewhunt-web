import React, { useState } from "react";
import PropTypes from "prop-types";
import backImg from "assets/images/back.svg";
import clockImg from "assets/images/clock.svg";
import SimpleButton from "components/SimpleButton";
import QuestStepProgress from "components/QuestStepProgress";
import HistoryMessage from "./HistoryMessage";

const QuestInfo = ({ steps, step }) => {
  const quest = steps[step];
  const {
    bounty_base,
    title,
    criteria,
    bounty_max,
    description,
    image
  } = quest;
  let tag =
    bounty_max === bounty_base ? bounty_base : `${bounty_base} - ${bounty_max}`;

  return (
    <div>
      <div className="info-number text-black">
        QUEST {steps[step].quest_type}
      </div>
      <div className="info-title text-black">{title}</div>

      <div className="quest-tag">Quest Bounty - ${tag}</div>

      {/*   <HistoryMessage
        type="confirm"
        message={"Your quest submission was confirmed."}
      />

      <HistoryMessage
        type="reject"
        message={
          "Your quest submission was not approved (if you want to appeal, use #reviewhunt-appeal channel in our Disocrd group (https://discord.gg/84zsT4m)."
        }
      />

      <HistoryMessage
        type="star"
        rating={9}
        message={"Your buzz content get 3.5 rating"}
      />

      <HistoryMessage
        type="star"
        rating={1}
        message={"Your buzz content get 3.5 rating"}
      />
      <HistoryMessage
        type="star"
        rating={2}
        message={"Your buzz content get 3.5 rating"}
      />
      <HistoryMessage
        type="star"
        rating={3}
        message={"Your buzz content get 3.5 rating"}
      />
      <HistoryMessage
        type="star"
        rating={4}
        message={"Your buzz content get 3.5 rating"}
      />
      <HistoryMessage
        type="star"
        rating={5}
        message={"Your buzz content get 3.5 rating"}
      />
      <HistoryMessage
        type="star"
        rating={6}
        message={"Your buzz content get 3.5 rating"}
      />

      <HistoryMessage
        type="earned"
        message={"Your quest submission was confirmed."}
      />
      <HistoryMessage
        type="paid"
        message={"Your quest submission was confirmed."}
      />*/}

      <div className="info-description text-grey">{description}</div>

      <div className="info-subheading text-black">
        YOUR SCREENSHOT MUST SHOW
      </div>
      <div className="info-description small-margin text-grey">{criteria}</div>

      <div className="info-subheading text-black">SCREENSHOT EXAMPLE</div>
      <img className="info-quest-image" src={image} alt=""/>
      <div className="full-width-button">SUBMIT YOUR SCREENSHOT</div>
    </div>
  );
};

const CurrentQuest = props => {
  const { data, onBackPressed } = props;
  const { quests } = data;
  let currentStep = 0;

  quests.forEach(({ status }, i) => {
    if (status !== null) {
      currentStep++;
    }
  });

  const [questInfoIndex, setQuestInfoIndex] = useState(currentStep);

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
        style={{ marginTop: 15, marginBottom: 30 }}
      />

      <div className="divider" />
      <QuestStepProgress
        steps={quests}
        currentStep={currentStep}
        containerStyle={{ marginTop: 16, marginBottom: 16 }}
        onStepClicked={step => setQuestInfoIndex(step)}
      />
      <QuestInfo steps={quests} step={questInfoIndex} />
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
