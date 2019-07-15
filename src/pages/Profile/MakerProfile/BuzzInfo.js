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

const ChannelSubmissionItem = ({ image, text, onClick, registered }) => {
  return (
    <div className={`channel-submission-item ${!registered && "unregistered"}`}>
      <div className="channel-submission-content">
        <img src={image} alt="" />
        <div className="channel-text text-black">{text}</div>
        {registered ? (
          <div className="channel-expected-earning text-green">
            Your Expected Earnings
            <br />
            12.5K HUNT ($130.24)
          </div>
        ) : (
          <div className="channel-expected-earning text-grey">
            You didn't reigster
            <br />
            this channel
          </div>
        )}
      </div>
      <FullWidthButton
        text={registered ? "Submit" : "Register"}
        onClick={() => {
          if(!registered) {
            //redirect to onboarding
            return;
          }
          onClick()
        }}
        inverse={!registered}
        style={registered ? {} : {borderTop: 'solid 1px #e5e5e5'}}
      />
    </div>
  );
};

ChannelSubmissionItem.defaultProps = {
  registered: false
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

  const [submitChannel, setSubmitChannel] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [proofImage, setProofImage] = useState([]);
  const [urlText, setUrlText] = useState("");
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
        How to submit the proof
      </div>

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
        <ChannelSubmissionItem
          text="Youtube"
          image={youtubeIcon}
          onClick={() => {
            setSubmitChannel("youtube");
            setModalVisible(true);
          }}
          registered={true}
        />
        <ChannelSubmissionItem
          text="Instagram"
          image={instagramIcon}
          onClick={() => {
            setSubmitChannel("instagram");
            setModalVisible(true);
          }}
        />
        <ChannelSubmissionItem
          text="Twitter"
          image={twitterIcon}
          onClick={() => {
            setSubmitChannel("twitter");
            setModalVisible(true);
          }}
        />
        <ChannelSubmissionItem
          text="Steem DApps"
          image={steemIcon}
          onClick={() => {
            setSubmitChannel("steem");
            setModalVisible(true);
          }}
        />
        <ChannelSubmissionItem
          text="Reddit"
          image={redditIcon}
          onClick={() => {
            setSubmitChannel("reddit");
            setModalVisible(true);
          }}
        />
        <ChannelSubmissionItem
          text="Twitch"
          image={twitchIcon}
          onClick={() => {
            setSubmitChannel("twitch");
            setModalVisible(true);
          }}
        />
        <ChannelSubmissionItem
          text="Medium"
          image={mediumIcon}
          onClick={() => {
            setSubmitChannel("medium");
            setModalVisible(true);
          }}
        />
        <ChannelSubmissionItem
          text="Other Channels"
          image={otherIcon}
          onClick={() => {
            setSubmitChannel("other");
            setModalVisible(true);
          }}
        />
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
            Submit {submitChannel} Proof
          </div>

          <TextInput
            textArea
            value={urlText}
            setValue={v => {
              setUrlText(v);
            }}
            title={"Content URL"}
            placeholder="Input URL"
            containerStyle={{ marginTop: 20 }}
          />
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
                Buzz rewards have a set range of rewards, and it will be varied
                based on our buzz quality measurement that considers your
                channel size, potential reach, actual performance, etc. Please
                note that we won’t be able to reward your buzz content when it
                doesn’t meet our minimum level of buzz quality measurement
                score.
              </div>
            </div>
            <div className="row-align-start">
              <div className="bullet-point">•</div>
              <div>
                All the content MUST be visible to public. If yours is private
                or visible only via the link you provided, your buzz content
                won’t be rewarded.
              </div>
            </div>
            <div className="row-align-start">
              <div className="bullet-point">•</div>
              <div>
                Upload all buzz content that you’ve made at once if you’ve
                performed via multiple channels. You are NOT able to add more
                reviews once you’ve made your submission.
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
          </div>
          <FullWidthButton
            onClick={() =>
              submitQuest(quest, submitChannel, urlText, proofImage)
            }
            text="SUBMIT YOUR PROOF"
            style={{ marginTop: 30 }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default BuzzInfo;
