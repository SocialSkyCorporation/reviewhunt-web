import React, { useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import Linkify from "react-linkify";
import { Icon, Spin, Modal } from "antd";
import backImg from "assets/images/back.svg";
import clockImg from "assets/images/clock.svg";
import approvedImg from "assets/images/approved.svg";
import pendingImg from "assets/images/pending.svg";
import rejectedImg from "assets/images/rejected.svg";
import SimpleButton from "components/SimpleButton";
import QuestStepProgress from "components/QuestStepProgress";
import HistoryMessage from "../HistoryMessage";
import FullWidthButton from "components/FullWidthButton";
import { Dropdown, TextInput, Screenshots } from "components/FormTypes";
import HunterDashboardContext from "contexts/HunterDashboardContext";
import AuthContext from "contexts/AuthContext";
import AppContext from "contexts/AppContext";
import CircularProgress from "components/CircularProgress";
import { availableChannels } from "utils/constants";
import { numberWithCommas } from "utils/helpers/numberFormatHelper";
import { filterAllowedChannels } from "utils/helpers/campaignHelper";
import moment from "moment";
import _ from "lodash";

const ChannelSubmissionItem = ({ data, onClick, submittedData }) => {
  const { reward_estimation, profile_image, channel_type } = data;
  const { huntPerUsd } = useContext(AppContext);
  const [timer, setTimer] = useState(null);

  const image = _.find(availableChannels, ["key", channel_type]).greyIcon;

  const usdPrice = numberWithCommas(parseFloat(reward_estimation).toFixed(2));
  const huntPrice = numberWithCommas(
    (parseFloat(reward_estimation) / huntPerUsd).toFixed(2)
  );

  const status = submittedData ? submittedData.status : null;
  let buttonText = status ? <Icon type="loading" /> : "Join";
  let img = null;

  const joined = status === "joined";

  if (timer && status === "joined") {
    buttonText = `SUBMIT IN ${timer}`;
  } else if (status === "submitted") {
    buttonText = "WAITING FOR MODERATION";
    img = pendingImg;
  } else if (status === "approved") {
    buttonText = "CONFIRMED";
    img = approvedImg;
  } else if (status === "rejected") {
    buttonText = "REJECTED";
    img = rejectedImg;
  }

  useEffect(() => {
    let tickTime = null;
    if (status === "joined") {
      const { expires_at } = submittedData;
      tickTime = setInterval(() => {
        const timeNow = moment();
        const expirationTime = moment(expires_at);
        const diff = expirationTime.diff(timeNow);
        const days = moment.duration(diff).days();
        let display = moment(diff).format("hh:mm:ss");
        if (days > 0) {
          display = days + " days " + display;
        }
        setTimer(display);
      }, 1000);
    }

    return () => clearInterval(tickTime);
  }, [status]);

  return (
    <Spin tip="Joining..." spinning={status && status === "joining"}>
      <div
        className={`channel-submission-item ${status === null &&
          "unregistered"}`}
      >
        {status && (
          <>
            {status !== null && status !== "joined" && (
              <div className="complete-overlay">
                <img src={img} alt="" />
              </div>
            )}
          </>
        )}
        <div className="channel-submission-content">
          {profile_image && (
            <img className="channel-icon-right-corner" src={image} alt="" />
          )}
          <img
            className="channel-submission-icon"
            src={profile_image || image}
            alt=""
          />
          <div className="channel-text text-black">
            {_.capitalize(channel_type)}
          </div>
          {joined && (
            <div className="channel-expected-earning text-green">
              Your Expected Earnings
              <br />
              {huntPrice} HUNT (${usdPrice})
            </div>
          )}
          {status === null && (
            <div className="channel-expected-earning text-grey">
              You did not join
              <br />
              this quest
            </div>
          )}
          {status === "submitted" && (
            <div className="channel-expected-earning text-grey">
              Quest Submitted
              <br />
            </div>
          )}
        </div>
        <FullWidthButton
          text={buttonText}
          onClick={() => {
            onClick(data);
          }}
          inverse={status === null}
          style={joined ? {} : { borderTop: "solid 1px #e5e5e5" }}
        />
      </div>
    </Spin>
  );
};

const BuzzInfo = ({ quest }) => {
  const {
    id,
    bounty_base,
    title,
    criteria,
    bounty_max,
    description,
    allowed_channels,
    image
  } = quest;

  const {
    updateState,
    submittingQuest,
    submitModalVisible,
    submitQuest,
    submittedQuests,
    fetchingSubmittedQuests,
    getQuestSubmissions,
    joinQuest
  } = useContext(HunterDashboardContext);

  const { loading, getSocialChannels, socialChannels } = useContext(
    AuthContext
  );

  const { huntPerUsd } = useContext(AppContext);

  useEffect(() => {
    getSocialChannels();
  }, []);

  useEffect(() => {
    getQuestSubmissions(id);
  }, [quest]);

  const [submitChannel, setSubmitChannel] = useState("");
  const [proofImage, setProofImage] = useState([]);
  const [urlText, setUrlText] = useState("");

  let huntReward = 0;
  let usdReward = 0;

  let tag =
    bounty_max === bounty_base
      ? `$${bounty_base}`
      : `$${bounty_base} - $${bounty_max}`;

  if (submitChannel) {
    huntReward = numberWithCommas(
      (parseFloat(submitChannel.reward_estimation) / huntPerUsd).toFixed(2)
    );
    usdReward = numberWithCommas(
      parseFloat(submitChannel.reward_estimation).toFixed(2)
    );
  }

  const allowedChannels = useMemo(() => {
    return filterAllowedChannels(socialChannels, allowed_channels).map(
      (buzzChannel, index) => {
        const submitted = _.find(submittedQuests, [
          "buzz_channel_id",
          buzzChannel.id
        ]);
        return (
          <ChannelSubmissionItem
            key={buzzChannel.id}
            data={buzzChannel}
            onClick={data => {
              if (!submitted) {
                joinQuest(id, buzzChannel.channel_type, buzzChannel.id);
                return;
              }
              setSubmitChannel(submitted);
              updateState("submitModalVisible", true);
            }}
            submittedData={submitted}
          />
        );
      }
    );
  }, [allowed_channels, socialChannels, submittedQuests]);

  return (
    <div>
      <div className="info-number text-black uppercase">Buzz</div>
      <div className="info-title text-black">
        Introduce this product via your social/community channel.
      </div>

      <div className="quest-tag">Quest Bounty - {tag}</div>

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
        Submit Buzz Content
      </div>

      <div className="text-grey buzz-warning-text">
        Please see the channels you’ve added when you joined this review
        campaign.{" "}
        <span className="text-warning">
          You MUST submit all the channels below that you’ve declared initially.
          If not, you will get panelty point that may limit your Reviewhunt
          activities.
        </span>
      </div>

      {loading || fetchingSubmittedQuests ? (
        <CircularProgress fullPage={false} />
      ) : (
        <div className="channel-submission-items">{allowedChannels}</div>
      )}

      <Modal
        maskClosable={false}
        onCancel={() => updateState("submitModalVisible", false)}
        visible={submitModalVisible}
        footer={null}
        width={720}
        bodyStyle={{ padding: 60 }}
        wrapClassName="profile-page"
      >
        <Spin spinning={submittingQuest} tip="Loading...">
          <div className="submission-modal">
            <div className="text-black submission-modal-title uppercase">
              Submit {submitChannel.channel_type} Content
            </div>

            <div className="buzz-estimation-container">
              <div className="text-green estimation-text">
                Your Reward Estimation: {huntReward} HUNT(${usdReward})
              </div>
              <div className="text-grey">
                This estimated reward for your [{submitChannel.channel_type}]
                channel is our recommended reeward amount based on our channel
                evaluation algorithm. However, please note that{" "}
                <span>
                  the final amount will be made by the maker’s decision.
                </span>
              </div>
              <div className="text-black registered-channel-text">
                Your registered channel
              </div>
              <a href={submitChannel.url} target="__blank">
                {submitChannel.url}
              </a>
              <div className="buzz-channel-stats text-grey">
                Followers: {submitChannel.follower_count}
                <br />
                Engagement Rate:{" "}
                {(submitChannel.engagement_rate * 100).toFixed(2)}
                <br />
                Earning per post (estimation): {huntReward} HUNT ($
                {usdReward})
              </div>
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
                  Buzz rewards have a set range of rewards, and it will be
                  varied based on our buzz quality measurement that considers
                  your channel size, potential reach, actual performance, etc.
                  Please note that we won’t be able to reward your buzz content
                  when it doesn’t meet our minimum level of buzz quality
                  measurement score.
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
                  It is NOT possible to edit your submission once you’ve made,
                  so please make sure that you have achieved all the guidelines
                  addressed above.
                </div>
              </div>
            </div>
            <FullWidthButton
              onClick={() =>
                submitQuest(submitChannel, submitChannel, urlText, proofImage)
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

export default BuzzInfo;
