import React, {
  useState,
  useCallback,
  useEffect,
  useContext,
  memo
} from "react";
import PropTypes from "prop-types";
import { Collapse, Icon } from "antd";
import { TextInput, Screenshots } from "./FormTypes";
import SimpleButton from "components/SimpleButton";
import NewCampaignContext, {
  NewCampaignConsumer
} from "contexts/NewCampaignContext";

const CreateQuestForm = memo(
  ({ id, index }) => {
    const {
      createQuest,
      deleteQuest,
      updateStateSingleQuest,
      saveQuest,
      quests
    } = useContext(NewCampaignContext);

    const {
      title,
      description,
      criteria,
      quest_type,
      bounty_amount,
      image
    } = quests[index].value;
    const saved = quests[index].saved;

    return (
      <div>
        <TextInput
          title={"Quest Name"}
          containerStyle={{ marginTop: 0 }}
          value={title}
          setValue={v => updateStateSingleQuest(index, "title", v)}
        />
        <TextInput
          title={"Description"}
          textArea
          textAreaHeight={200}
          value={description}
          setValue={v => updateStateSingleQuest(index, "description", v)}
          maxCharacters={260}
        />
        <Screenshots
          title={"Proof Example"}
          single
          maxBytes={1000000}
          images={image}
          onChange={files =>
            updateStateSingleQuest(index, "image", files[0].image)
          }
        />
        <TextInput
          title={"What to include in the quest proof"}
          textArea
          textAreaHeight={140}
          value={criteria}
          setValue={v => updateStateSingleQuest(index, "criteria", v)}
          maxCharacters={560}
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
            text={saved ? "SAVED" : "Save"}
          />
        </div>
      </div>
    );
  },
  ({ quests: prevQuests }, { quests: nextQuests }) => prevQuests === nextQuests
);

CreateQuestForm.propTypes = {};

CreateQuestForm.defaultProps = {};

export default CreateQuestForm;
