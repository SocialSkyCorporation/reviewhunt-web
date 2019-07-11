import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Icon, Modal } from "antd";
import backImg from "assets/images/back.svg";
import clockImg from "assets/images/clock.svg";
import SimpleButton from "components/SimpleButton";
import QuestStepProgress from "components/QuestStepProgress";
import HistoryMessage from "../HistoryMessage";
import FullWidthButton from "components/FullWidthButton";
import { Dropdown, TextInput, Screenshots } from "components/FormTypes";
import HunterDashboardContext from "contexts/HunterDashboardContext";

import youtubeIcon from "assets/images/youtube.svg";
import instagramIcon from "assets/images/instagram.svg";
import twitterIcon from "assets/images/twitter.svg";
import steemIcon from "assets/images/steemit.svg";
import redditIcon from "assets/images/reddit.svg";
import twitchIcon from "assets/images/twitch.svg";
import mediumIcon from "assets/images/medium.svg";
import otherIcon from "assets/images/other.svg";

const ChannelSubmissionItem = ({ image, text, onClick }) => {
  return (
    <div className="channel-submission-item">
      <img src={image} alt="" />
      <div className="channel-text text-black">{text}</div>
      <SimpleButton
        text="Submit"
        onClick={onClick}
        style={{ minWidth: 80, maxWidth: 80, marginTop: 24 }}
      />
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

      <div className="info-subheading text-black uppercase">How to submit the proof</div>

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

      <div className="info-subheading text-black uppercase">
        Accepting channels
      </div>

      <div className="channel-submission-items">
        <ChannelSubmissionItem text="Youtube" image={youtubeIcon} />
        <ChannelSubmissionItem text="Instagram" image={instagramIcon} />
        <ChannelSubmissionItem text="Twitter" image={twitterIcon} />
        <ChannelSubmissionItem text="Steem DApps" image={steemIcon} />
        <ChannelSubmissionItem text="Reddit" image={redditIcon} />
        <ChannelSubmissionItem text="Twitch" image={twitchIcon} />
        <ChannelSubmissionItem text="Medium" image={mediumIcon} />
        <ChannelSubmissionItem text="Other Channels" image={otherIcon} />
      </div>
      
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

export default BuzzInfo;
