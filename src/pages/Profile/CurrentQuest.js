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

const QuestInfo = ({ quest }) => {
  const { id } = quest;
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
  const [proofImage, setProofImage] = useState([]);
  const [proofText, setProofText] = useState("");

  const { submitQuest } = useContext(HunterDashboardContext);

  return (
    <div>
      <div className="info-number text-black">QUEST {quest.quest_type}</div>
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
      <FullWidthButton
        text="SUBMIT YOUR SCREENSHOT"
        onClick={() => setModalVisible(true)}
      />
      <Modal
        maskClosable={true}
        onCancel={() => setModalVisible(false)}
        visible={modalVisible}
        footer={null}
        style={{ width: 600 }}
        bodyStyle={{ padding: 60 }}
        wrapClassName="profile-page"
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
            onClick={() => submitQuest(quest)}
            text="SUBMIT YOUR PROOF"
            style={{ marginTop: 30 }}
          />
        </div>
      </Modal>
    </div>
  );
};

const ReviewInfo = ({ quest }) => {
  const { id } = quest;
  const {
    bounty_base,
    title,
    criteria,
    bounty_max,
    description,
    image
  } = quest;

  const { submitQuest } = useContext(HunterDashboardContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [proofImage, setProofImage] = useState([]);
  const [proofText, setProofText] = useState("");
  const [submissionType, setSubmissionType] = useState("");

  return (
    <div>
      <div className="info-number text-black">REVIEW</div>
      <div className="info-title text-black">Write an app review</div>

      <div className="quest-tag">Quest Bounty - $5 per review</div>

      {/*   <HistoryMessage
        type="confirm"
        message={"Your quest submission was confirmed."}
      />
    */}

      <div className="info-description text-grey">
        Have you enjoyed the app? Please write a review on the App Store or Play
        Store. You can cheer the app so that other people can try more, or give
        some genuine feedback or other suggestions so that the app can be
        improved.
      </div>

      <div className="info-subheading text-black uppercase">
        How to submit the screenshot
      </div>
      <div className="info-description small-margin text-grey review">
        iPhone
      </div>
      <div className="info-description small-margin text-grey review">
        <div className="row-align-start">
          <div className="bullet-point">1.</div>
          <div>Launch the Settings app on your iPhone.</div>
        </div>
        <div className="row-align-start">
          <div className="bullet-point">2.</div>
          <div>Tap on iTunes and App Store.</div>
        </div>
        <div className="row-align-start">
          <div className="bullet-point">3.</div>
          <div>
            Tap on your Apple ID at the very top and choose the View Apple ID
            option in the popup window.
          </div>
        </div>
        <div className="row-align-start">
          <div className="bullet-point">4.</div>
          <div>Type in your password when prompted.</div>
        </div>
        <div className="row-align-start">
          <div className="bullet-point">5.</div>{" "}
          <div>Tap on Ratings and Reviews.</div>
        </div>
        <div className="row-align-start">
          <div className="bullet-point">6.</div>{" "}
          <div>
            Position your review of this app in the middle, and take a full
            screenshot of the page (with showing other app reviews you’ve made
            together).
          </div>
        </div>
      </div>

      <div className="info-description small-margin text-grey review">
        Android
      </div>
      <div className="info-description small-margin text-grey review">
        <div className="row-align-start">
          <div className="bullet-point">1.</div>
          <div>On your Android phone, open the Google Play Store app.</div>
        </div>
        <div className="row-align-start">
          <div className="bullet-point">2.</div>
          <div>Go to the detail page of the app you reviewed.</div>
        </div>
        <div className="row-align-start">
          <div className="bullet-point">3.</div>
          <div>Scroll to the reviews section.</div>
        </div>
        <div className="row-align-start">
          <div className="bullet-point">4.</div>
          <div>
            Position your review that is located on the top of the review
            section, and take a full screenshot of the page.
          </div>
        </div>
      </div>

      <div className="info-subheading text-black">SCREENSHOT EXAMPLE</div>
      <div className="row-align-start">
        <div>
          <div className="text-tiny text-grey text-device">iPhone</div>
          <img className="info-quest-image" src={image} alt="" />
        </div>
        <div className="screenshot-example">
          <div className="text-tiny text-grey text-device">Android</div>
          <img className="info-quest-image" src={image} alt="" />
        </div>
      </div>

<Dropdown value="App Store" style={{marginTop: 20}}/>
      <FullWidthButton
        onClick={() => {
          setSubmissionType("appstore");
          setModalVisible(true);
        }}
        text="SUBMIT APP STORE REVIEW"
        style={{ marginTop: 16 }}
      />

      {/*<FullWidthButton
  onClick={() => {
    setSubmissionType("playstore");
    setModalVisible(true);
  }}
  text="SUBMIT PLAYSTORE STORE REVIEW"
  style={{ marginTop: 16 }}
/>;*/}
      <div className="skip-button hover-link">
        <div className="text-small text-grey row-align-center">
          <div>Skip</div>
          <Icon type="right" />
        </div>
      </div>
      <Modal
        maskClosable={true}
        onCancel={() => setModalVisible(false)}
        visible={modalVisible}
        footer={null}
        style={{ width: 600 }}
        bodyStyle={{ padding: 60 }}
        wrapClassName="profile-page"
      >
        <div className="submission-modal">
          <div className="text-black submission-modal-title uppercase">
            Submit {submissionType === "appstore" ? "App Store" : "Play Store"} Review
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
                ONLY the screenshot page that is described above will be
                accepted. If you take your proof in other ways, your submission
                will be rejected.
              </div>
            </div>
            <div className="row-align-start">
              <div className="bullet-point">•</div>
              <div>
                Your review of this app must be shown FULLY, and should be well
                positioned in the middle of your screenshot. If some part of
                your review is cut or missing, it will be rejected.
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
                FULL screenshot on your device.
              </div>
            </div>
            <div className="row-align-start">
              <div className="bullet-point">•</div>
              <div>
                It is NOT possible to edit your submission once you’ve made, so
                please make sure that you have achieved all the guidelines
                addressed above.
              </div>
            </div>
            <div className="row-align-start">
              <div className="bullet-point">•</div>
              <div>
                Upload both App Store and Play Store reviews at once if you’ve
                performed via the both channels. You are NOT able to add more
                reviews once you’ve made your submission.
              </div>
            </div>
          </div>
          <FullWidthButton
            onClick={() => submitQuest(quest)}
            text={`SUBMIT ${submissionType === "appstore" ? "APP STORE" : "PLAY STORE"} REVIEW`}
            style={{ marginTop: 30 }}
          />
        </div>
      </Modal>
    </div>
  );
};

const BuzzInfo = ({ quest }) => {
  const { id } = quest;
  const {
    bounty_base,
    title,
    criteria,
    bounty_max,
    description,
    image
  } = quest;

  const { submitQuest } = useContext(HunterDashboardContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [proofImage, setProofImage] = useState([]);
  const [proofText, setProofText] = useState("");
  return (
    <div>
      <div className="info-number text-black uppercase">Buzz</div>
      <div className="info-title text-black">
        Introduce this product via your social/community channel.
      </div>

      <div className="quest-tag">Quest Bounty - $0 to $100</div>

      {/*   <HistoryMessage
        type="confirm"
        message={"Your quest submission was confirmed."}
      />
    */}

      <div className="info-description text-grey">
        Have you enjoyed the app? Please write a review content via your own
        social or community channels such as Reddit, Youtube, Twitter,
        Instagram, Medium, and hundreds of other sites. Your content will be
        rewarded when it makes an impact via the channel you shared.
      </div>

      <div className="info-subheading text-black uppercase">
        Accepting channels
      </div>

      <div className="info-subheading text-black">How to submit the proof</div>

      <div className="info-description small-margin text-grey review">
        <div className="row-align-start">
          <div className="bullet-point">1.</div>
          <div>
            Choose the social or community channel that the maker accept.
          </div>
        </div>
        <div className="row-align-start">
          <div className="bullet-point">2.</div>
          <div>Provide the URL of your buzz content correctly.</div>
        </div>
        <div className="row-align-start">
          <div className="bullet-point">3.</div>
          <div>
            Take the full screenshot image that shows well about your content
            (optional).
          </div>
        </div>
      </div>

      <FullWidthButton
        text="SUBMIT YOUR SCREENSHOT"
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
          <TextInput
            textArea
            value={proofText}
            setValue={v => {
              setProofText(v);
            }}
            title={"Additional Information (Optional)"}
            containerStyle={{ marginTop: 20 }}
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
            onClick={() => submitQuest(quest)}
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
  let currentStep = 2;
  quests.push({ quest_type: "buzz", status: null });

  quests.forEach(({ status }, i) => {
    if (status !== null) {
      currentStep++;
    }
  });

  const [questInfoIndex, setQuestInfoIndex] = useState(currentStep);

  const quest = quests[questInfoIndex];
  const { quest_type } = quest;

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
