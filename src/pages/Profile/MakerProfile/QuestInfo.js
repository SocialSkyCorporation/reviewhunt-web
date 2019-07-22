import React, { useEffect, useContext, useState } from "react";
import PropTypes from "prop-types";
import { Icon, Spin, Modal } from "antd";
import backImg from "assets/images/back.svg";
import clockImg from "assets/images/clock.svg";
import SimpleButton from "components/SimpleButton";
import QuestStepProgress from "components/QuestStepProgress";
import HistoryMessage from "../HistoryMessage";
import FullWidthButton from "components/FullWidthButton";
import { Dropdown, TextInput, Screenshots } from "components/FormTypes";
import HunterDashboardContext from "contexts/HunterDashboardContext";

const QuestInfo = ({ quest }) => {
  const { id } = quest;
  const {
    quest_type,
    bounty_base,
    title,
    criteria,
    bounty_max,
    description,
    image,
    status
  } = quest;
  let tag =
    bounty_max === bounty_base
      ? `$${bounty_base}`
      : `$${bounty_base} - $${bounty_max}`;

  const [proofImage, setProofImage] = useState([]);
  const [proofText, setProofText] = useState("");

  const {
    updateState,
    submittingQuest,
    submitModalVisible,
    submitQuest,
    fetchingSubmittedQuests,
    getQuestSubmissions,
    submittedQuests
  } = useContext(HunterDashboardContext);

  useEffect(() => {
    getQuestSubmissions(id);
  }, []);

  console.log("submitted", submittedQuests);

  return (
    <div>
      <div className="info-number text-black">
        QUEST {quest_type.replace(/\D/g, "")}
      </div>
      <div className="info-title text-black uppercase">{title}</div>

      <div className="quest-tag">Quest Bounty - ${tag}</div>

      <HistoryMessage
        type="general"
        status={status}
      />

      <div className="info-description text-grey">{description}</div>

      <div className="info-subheading text-black">
        YOUR SCREENSHOT MUST SHOW
      </div>
      <div className="info-description small-margin text-grey">{criteria}</div>

      <div className="info-subheading text-black">SCREENSHOT EXAMPLE</div>
      <img className="info-quest-image" src={image} alt="" />
      <FullWidthButton
        text="JOIN QUEST"
        onClick={() => updateState("submitModalVisible", true)}
        style={{ maxWidth: 240 }}
      />
      <Modal
        maskClosable={false}
        onCancel={() => updateState("submitModalVisible", false)}
        visible={submitModalVisible}
        footer={null}
        width="auto"
        bodyStyle={{ padding: 60 }}
        wrapClassName="profile-page"
      >
        <Spin spinning={submittingQuest} tip="Loading...">
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
            <Screenshots
              single
              images={proofImage}
              onChange={images => setProofImage(images)}
            />
            <div className="text-small text-black uppercase submission-modal-header">
              Guidelines
            </div>
            <div className="text-small text-grey submission-modal-desc submission-modal-guidelines">
              <div className="row-align-start">
                <div className="bullet-point">•</div>
                <div>
                  Your screenshot must inclde ALL the items addressed above. If
                  we’re failed to identify some (or all) of the items, your
                  submission will be rejected.
                </div>
              </div>
              <div className="row-align-start">
                <div className="bullet-point">•</div>
                <div>
                  Please make sure your screenshot has a good resolution that
                  enables us to clearly identify all necessary information from
                  your screenshot. Too low resolution image will be rejected.
                </div>
              </div>
              <div className="row-align-start">
                <div className="bullet-point">•</div>
                <div>
                  Do not cut of your screenshot. Please make sure you captured a
                  FULL screenshot on your device. • It is NOT possible to edit
                  your submission once you’ve made, so please make sure that you
                  have achieved all the guidelines addressed above.
                </div>
              </div>
            </div>
            <FullWidthButton
              onClick={() =>
                submitQuest(quest, { channel_type: null }, null, proofImage)
              }
              text="SUBMIT YOUR PROOF"
              style={{ marginTop: 30 }}
            />
          </div>
        </Spin>
      </Modal>
    </div>
  );
};

export default QuestInfo;
