import React, {
  useState,
  useCallback,
  useEffect,
  useContext,
  useMemo
} from "react";
import PropTypes from "prop-types";
import { Spin } from "antd";
import { TextInput, Screenshots } from "components/FormTypes";
import SimpleButton from "components/SimpleButton";
import NewCampaignContext from "contexts/NewCampaignContext";
import { filterGeneralQuests } from "utils/helpers/campaignHelper";

const CreateQuestForm = ({ index }) => {
  const {
    createQuest,
    deleteQuest,
    updateStateSingleQuest,
    saveQuest,
    quests
  } = useContext(NewCampaignContext);

  const {
    id,
    saved,
    title,
    description,
    criteria,
    bounty_amount,
    saving,
    image
  } = quests[index];

  const generalQuests = quests.filter(filterGeneralQuests);

  return (
    <Spin spinning={saving === true} tip="Saving...">
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
          small
          maxBytes={20000000}
          images={typeof image === "string" ? [image] : image}
          onChange={files => updateStateSingleQuest(index, "image", files)}
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
          {generalQuests.length !== 1 && generalQuests.length - 1 === index && (
            <div
              className="text-grey delete-button hover-link"
              onClick={() => deleteQuest(index, id)}
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
                bounty_amount: 1,
                quest_type: `general_${index + 1}`,
                image
              };
              if (id !== null) {
                saveQuest(id, form, index);
              } else {
                createQuest(id, form, index);
              }
            }}
            text={saved ? "SAVED" : "Save"}
          />
        </div>
      </div>
    </Spin>
  );
};

CreateQuestForm.propTypes = {};

CreateQuestForm.defaultProps = {};

export default CreateQuestForm;
