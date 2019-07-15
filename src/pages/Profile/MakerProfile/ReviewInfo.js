import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Icon, Modal } from "antd";
import backImg from "assets/images/back.svg";
import clockImg from "assets/images/clock.svg";
import appstoreLogo from "assets/images/appstore-logo.svg";
import playstoreLogo from "assets/images/playstore-logo.svg";
import SimpleButton from "components/SimpleButton";
import QuestStepProgress from "components/QuestStepProgress";
import HistoryMessage from "../HistoryMessage";
import FullWidthButton from "components/FullWidthButton";
import { Dropdown, TextInput, Screenshots } from "components/FormTypes";
import HunterDashboardContext from "contexts/HunterDashboardContext";

const ReviewInfo = ({ quest }) => {
  const { id } = quest;
  const {
    allowed_channels,
    bounty_base,
    title,
    criteria,
    bounty_max,
    description,
    image
  } = quest;

  const { submitQuest } = useContext(HunterDashboardContext);

  const hasPlaystore = allowed_channels.includes("playstore");
  const hasAppstore = allowed_channels.includes("appstore");

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

      {hasAppstore && (
        <>
          <div className="divider-line" />
          <div className="info-title text-black">App Store (iPhone)</div>
          <div className="info-subheading text-black uppercase">
            How to submit the screenshot
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
                Tap on your Apple ID at the very top and choose the View Apple
                ID option in the popup window.
              </div>
            </div>
            <div className="row-align-start">
              <div className="bullet-point">4.</div>
              <div>Type in your password when prompted.</div>
            </div>
            <div className="row-align-start">
              <div className="bullet-point">5.</div>
              <div>Tap on Ratings and Reviews.</div>
            </div>
            <div className="row-align-start">
              <div className="bullet-point">6.</div>
              <div>
                Position your review of this app in the middle, and take a full
                screenshot of the page (with showing other app reviews you’ve
                made together).
              </div>
            </div>
          </div>

          <div className="info-subheading text-black">SCREENSHOT EXAMPLE</div>
          <div>
            <img className="info-quest-image" src={image} alt="" />
          </div>

          <FullWidthButton
            icon={<img src={appstoreLogo} />}
            onClick={() => {
              setSubmissionType("appstore");
              setModalVisible(true);
            }}
            text="SUBMIT APP STORE REVIEW"
            style={{ marginTop: 16 }}
          />
        </>
      )}

      {hasPlaystore && (
        <>
          <div className="divider-line" />

          <div className="info-title text-black">Play Store (Android)</div>
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
          <div>
            <img className="info-quest-image" src={image} alt="" />
          </div>

          <FullWidthButton
            icon={<img src={playstoreLogo} />}
            onClick={() => {
              setSubmissionType("playstore");
              setModalVisible(true);
            }}
            text="SUBMIT PLAY STORE REVIEW"
            style={{ marginTop: 16 }}
          />
        </>
      )}

      <div className="skip-button hover-link">
        <div className="text-small text-grey row-align-center">
          <div>Skip</div>
          <Icon type="right" />
        </div>
      </div>

      <Modal
        maskClosable={false}
        onCancel={() => setModalVisible(false)}
        visible={modalVisible}
        footer={null}
        style={{ width: 600 }}
        bodyStyle={{ padding: 60 }}
        wrapClassName="profile-page"
      >
        <div className="submission-modal">
          <div className="text-black submission-modal-title uppercase">
            Submit {submissionType === "appstore" ? "App Store" : "Play Store"}{" "}
            Review
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
            onClick={() => submitQuest(quest, submissionType, null, proofImage)}
            text={`SUBMIT ${
              submissionType === "appstore" ? "APP STORE" : "PLAY STORE"
            } REVIEW`}
            style={{ marginTop: 30 }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ReviewInfo;
