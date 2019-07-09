import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";
import backImg from "assets/images/back.svg";
import clockImg from "assets/images/clock.svg";
import SimpleButton from "components/SimpleButton";
import QuestStepProgress from "components/QuestStepProgress";
import HistoryMessage from "./HistoryMessage";
import FullWidthButton from "components/FullWidthButton";
import { Screenshots } from "components/FormTypes";
import HunterDashboardContext from "contexts/HunterDashboardContext";



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

  const [modalVisible, setModalVisible] = useState(false);

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
      <img className="info-quest-image" src={image} alt="" />
      <FullWidthButton text="SUBMIT YOUR SCREENSHOT" 
            onClick={() => setModalVisible(true)}
      />
      <Modal
        maskClosable={true}
        onCancel={() => setModalVisible(false)}
        visible={modalVisible}
        footer={null}
        style={{ width: 600 }}
        bodyStyle={{ padding: 60 }}
      >
        <div className="submission-modal">
          <div className="text-black submission-modal-title uppercase">
            Submit Quest Proof
          </div>
          <div className="text-small text-black uppercase submission-modal-header">
            Your screenshot must show
          </div>
          <div className="text-small text-grey submission-modal-desc">
            {criteria}
          </div>
          <div className="row-space-between submission-modal-header">
            <div className="text-small text-black uppercase ">
              Upload Screenshot
            </div>
            <div className="text-small text-grey">Max 5 MB</div>
          </div>
          <Screenshots single />
          <div className="text-small text-black uppercase submission-modal-header">
            Guidelines
          </div>
          <div className="text-small text-grey submission-modal-desc submission-modal-guidelines">
            <div className="row-align-start">
              <span>•</span>
              <div>
                Your screenshot must inclde ALL the items addressed above. If
                we’re failed to identify some (or all) of the items, your
                submission will be rejected.
              </div>
            </div>
            <div className="row-align-start">
              <span>•</span>
              <div>
                Please make sure your screenshot has a good resolution that
                enables us to clearly identify all necessary information from
                your screenshot. Too low resolution image will be rejected.
              </div>
            </div>
            <div className="row-align-start">
              <span>•</span>
              <div>
                Do not cut of your screenshot. Please make sure you captured a
                FULL screenshot on your device. • It is NOT possible to edit
                your submission once you’ve made, so please make sure that you
                have achieved all the guidelines addressed above.
              </div>
            </div>
          </div>
          <FullWidthButton
            text="SUBMIT YOUR PROOF"
            style={{ marginTop: 30 }}
          />
        </div>
      </Modal>
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
