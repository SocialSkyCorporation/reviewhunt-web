import React, { useState } from "react";
import PropTypes from "prop-types";
import { Collapse, Icon } from "antd";
import { TextInput, Screenshots } from "./FormTypes";
import SimpleButton from "components/SimpleButton";
import { NewCampaignConsumer } from "./NewCampaignContext";

const CreateQuestForm = ({
  id,
  index,
  saved
}) => {
  const [title, setTitle] = useState("a");
  const [description, setDescription] = useState("b");
  const [criteria, setCriteria] = useState("c");
  const [quest_type, setQuestType] = useState("general");
  const [bounty_amount, setBountyAmount] = useState(0);
  const [image, setImage] = useState(null);

  return (
    <NewCampaignConsumer>
      {({createQuest, deleteQuest, saveQuest, quests, savingQuests}) => {
        const saving = savingQuests.includes(index);
        return (
          <div>
            <TextInput
              title={"Quest Name"}
              containerStyle={{ marginTop: 0 }}
              value={title}
              setValue={setTitle}
            />
            <TextInput
              title={"Description"}
              textArea
              textAreaHeight={200}
              value={description}
              setValue={setDescription}
            />
            <Screenshots title={"Proof Example"} single />
            <TextInput
              title={"What to include in the quest proof"}
              textArea
              textAreaHeight={140}
              value={criteria}
              setValue={setCriteria}
            />
            <div className="save-delete-container">
              {quests.length !== 1 && (
                <div
                  className="text-grey delete-button hover-link"
                  onClick={deleteQuest}
                >
                  DELETE
                </div>
              )}
              <SimpleButton
                onClick={() => {
                  //check if id is null. if non-null, then it's saved.
                  const form = {
                    title,
                    description,
                    criteria,
                    quest_type,
                    bounty_amount: 1,
                    image
                  };

                  if (saved) {
                    saveQuest(id, form, index);
                  } else {
                    createQuest(id, form, index);
                  }
                }}
                text={saving ? <Icon type="loading"/> : saved ? "SAVED" : "Save"}
              />
            </div>
          </div>
        );
      }}
    </NewCampaignConsumer>
  );
};

CreateQuestForm.propTypes = {};

CreateQuestForm.defaultProps = {};

export default CreateQuestForm;
