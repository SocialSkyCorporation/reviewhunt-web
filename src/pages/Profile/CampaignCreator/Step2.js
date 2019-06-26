import React from "react";
import PropTypes from "prop-types";
import { Collapse, Icon, Modal } from "antd";
import { TextInput, Screenshots, ProductLinks } from "./FormTypes";
import SimpleButton from "components/SimpleButton";
import CreateQuestForm from "./CreateQuestForm";
import { NewCampaignConsumer } from "contexts/NewCampaignContext";
import addCircleImg from "assets/images/add-circle.svg";

const { Panel } = Collapse;

const Step2 = ({}) => {
  return (
    <NewCampaignConsumer>
      {({ quests, addQuest, createQuest, deleteQuest, saveQuest }) => {
        const onSaveClicked = (e, index) => {
          e.stopPropagation();
          console.log("save clicked");
        };

        const onDeleteClicked = (e, index) => {
          e.stopPropagation();
          console.log("delete clicked");
          deleteQuest(index);
        };

        return (
          <div className="campaign-step">
            <div className="text-grey">Step 2 of 5</div>
            <div className="step-title text-black">Design Quests</div>
            <Collapse defaultActiveKey={["1"]}>
              {quests.map(({ id, saved }, index) => (
                <Panel
                  className="create-quest-panel"
                  header={`Quest ${index + 1}`}
                  key={index + 1}
                >
                  <CreateQuestForm id={id} index={index} saved={saved} />
                </Panel>
              ))}
            </Collapse>

            {quests.length < 3 && (
              <div className="add-more-quest hover-link" onClick={addQuest}>
                <img src={addCircleImg} alt="" />
                <div className="add-more-text">Add more quest</div>
              </div>
            )}

            <div className="save-next-container">
              <SimpleButton text={"Save and Next"} />
            </div>
          </div>
        );
      }}
    </NewCampaignConsumer>
  );
};

Step2.propTypes = {};

Step2.defaultProps = {};

export default Step2;
