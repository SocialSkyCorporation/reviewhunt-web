import React, { useContext } from "react";
import { Icon, Checkbox } from "antd";
import PropTypes from "prop-types";
import { TextInput } from "components/FormTypes";
import SimpleButton from "components/SimpleButton";
import NewCampaignContext, {
  STEP_CREATE_CAMPAIGN,
  STEP_CREATE_QUESTS,
  STEP_CAMPAIGN_BUDGET
} from "contexts/NewCampaignContext";
import appstoreImg from "assets/images/appstore.svg";
import playstoreImg from "assets/images/playstore.svg";

const channelOptions = [
  { label: "App Store Review", value: "appstore" },
  { label: "Youtube", value: "youtube" },
  { label: "Twitter", value: "twitter" },
  { label: "Instagram", value: "instagram" },
  { label: "Reddit", value: "reddit" },
  { label: "Medium", value: "medium" },
  { label: "Twitch", value: "twitch" },
  { label: "Steemit (and other Steem DApps)", value: "steem" },
  { label: "Other local channels", value: "others" }
];

const Step3 = ({}) => {
  const {
    questReview,
    questBuzz,
    campaignInfo,
    channelsCriteria,
    appstoreCriteria,
    updateState,
    setStep,
    updateReviewAndBuzz,
    saveReviewAndBuzz
  } = useContext(NewCampaignContext);

  return (
    <div className="campaign-step">
      <div className="text-grey">Step 3 of 5</div>
      <div className="step-title text-black">Review and Buzz</div>

      <div className="review-checkbox-container">
        <div className="review-buzz-text">Review</div>
        <Checkbox
          checked={
            questReview.allowed_channels.includes("appstore") ||
            questReview.allowed_channels.includes("playstore")
          }
          onChange={e => updateReviewAndBuzz("review", e)}
          value={channelOptions[0].value}
        >
          {channelOptions[0].label}
        </Checkbox>
        <div>
          <div className="url-container row-align-center">
            <div className="url-icon-circle">
              <img src={appstoreImg} alt="" />
            </div>
            {campaignInfo.urls.appstore ? (
              <a className="url-href" href={campaignInfo.urls.appstore}>
                {campaignInfo.urls.appstore}
              </a>
            ) : (
              <div className="row-align-center">
                <div className="url-desc text-grey">Not registered</div>
                <div
                  className="url-href hover-link"
                  onClick={() => {
                    setStep(STEP_CREATE_CAMPAIGN);
                  }}
                >
                  Register
                </div>
              </div>
            )}
          </div>

          <div className="url-container row-align-center">
            <div className="url-icon-circle">
              <img src={playstoreImg} alt="" />
            </div>
            {campaignInfo.urls.playstore ? (
              <a className="url-href" href={campaignInfo.urls.playstore}>
                {campaignInfo.urls.playstore}
              </a>
            ) : (
              <div className="row-align-center">
                <div className="url-desc text-grey">Not registered</div>
                <div
                  className="url-href hover-link"
                  onClick={() => {
                    setStep(STEP_CREATE_CAMPAIGN);
                  }}
                >
                  Register
                </div>
              </div>
            )}
          </div>

          <TextInput
            title={"What to include in the quest proof"}
            textArea
            textAreaHeight={92}
            maxCharacters={560}
            value={appstoreCriteria}
            setValue={value => updateState("appstoreCriteria", value)}
          />

          <div className="divider-line" />
        </div>

        <div className="review-buzz-text">Buzz</div>
        {channelOptions.map((channel, index) => {
          if (index === 0) return null;
          return (
            <Checkbox
              key={index}
              checked={questBuzz.allowed_channels.includes(channel.value)}
              onChange={e => updateReviewAndBuzz("buzz", e)}
              value={channel.value}
            >
              {channel.label}
            </Checkbox>
          );
        })}
      </div>

      <TextInput
        title={"What to include in the quest proof"}
        textArea
        textAreaHeight={92}
        maxCharacters={560}
        value={channelsCriteria}
        setValue={value => updateState("channelsCriteria", value)}
      />

      <div className="save-next-container">
        <div
          className="row-align-center text-grey"
          onClick={() => setStep(STEP_CREATE_QUESTS)}
        >
          <Icon type="left" />
          <div>Back</div>
        </div>
        <SimpleButton
          text={"Save and Next"}
          onClick={() => saveReviewAndBuzz()}
        />
      </div>
    </div>
  );
};

Step3.propTypes = {};

Step3.defaultProps = {};

export default Step3;
