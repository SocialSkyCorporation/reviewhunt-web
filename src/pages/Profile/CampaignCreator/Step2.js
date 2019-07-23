import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Collapse, Icon, Modal } from "antd";
import { TextInput, Screenshots, ProductLinks } from "components/FormTypes";
import SimpleButton from "components/SimpleButton";
import CreateQuestForm from "./CreateQuestForm";
import NewCampaignContext, {
  STEP_REVIEW_BUZZ,
  STEP_CREATE_CAMPAIGN
} from "contexts/NewCampaignContext";
import addCircleImg from "assets/images/add-circle.svg";
import { filterGeneralQuests } from "utils/helpers/campaignHelper";

const { Panel } = Collapse;

const Step2 = ({}) => {
  const { activeKeys, saveAllGeneralQuests, quests, addQuest, setStep, updateState } = useContext(NewCampaignContext);
  const generalQuests = quests.filter(filterGeneralQuests);

  return (
    <div className="campaign-step">
      <div className="text-grey">Step 2 of 5</div>
      <div className="step-title text-black">Design Quests</div>
      <Collapse activeKey={activeKeys} onChange={keys => updateState("activeKeys", keys)}>
        {generalQuests.map((quest, index) => {
          const { quest_type } = quest;
          if (quest_type !== "buzz" && quest_type !== "review") {
            return (
              <Panel
                className="create-quest-panel"
                header={`Quest ${index + 1}`}
                key={index + 1}
              >
                <CreateQuestForm index={index} />
              </Panel>
            );
          }
        })}
      </Collapse>

      {generalQuests.length < 3 && (
        <div className="add-more-quest hover-link" onClick={addQuest}>
          <img src={addCircleImg} alt="" />
          <div className="add-more-text">Add more quest</div>
        </div>
      )}

      <div className="save-next-container">
        <div
          className="row-align-center text-grey"
          onClick={() => setStep(STEP_CREATE_CAMPAIGN)}
        >
          <Icon type="left" />
          <div>Back</div>
        </div>
        <SimpleButton
          text={"Save and Next"}
          onClick={() => saveAllGeneralQuests()}
        />
      </div>
    </div>
  );
};

Step2.propTypes = {};

Step2.defaultProps = {};

export default Step2;
