import React, { useContext } from "react";
import { Icon, Checkbox } from "antd";
import PropTypes from "prop-types";
import { TextInput } from "./FormTypes";
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
  { label: "Blog", value: "blog" },
  { label: "Twitch", value: "twitch" },
  { label: "Steemit (and other Steem DApps)", value: "steemit" },
  { label: "Other local channels", value: "other" }
];

const Step3 = ({}) => {
  const { channels, campaignInfo, channelDescription, updateState, setStep, updateReviewAndBuzz } = useContext(
    NewCampaignContext
  );

  return (
    <div className="campaign-step">
      <div className="text-grey text-small">Step 3 of 5</div>
      <div className="step-title text-black">Review and Buzz</div>

      <div className="review-checkbox-container">
        <Checkbox
          checked={channels.includes(channelOptions[0].value)}
          onChange={e => updateReviewAndBuzz(e)}
          value={channelOptions[0].value}
        >
          {channelOptions[0].label}
        </Checkbox>
        <div>
          <div className="url-container row-align-center">
            <div className="url-icon-circle">
              <img src={appstoreImg} alt="" />
            </div>
            {campaignInfo.appstore ? (
              <a className="url-href" href={campaignInfo.appstore}>
                {campaignInfo.appstore}
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
            {campaignInfo.playstore ? (
              <a className="url-href" href={campaignInfo.appstore}>
                {campaignInfo.playstore}
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
        </div>

        {channelOptions.map((channel, index) => {
          if (index === 0) return null;
          return (
            <Checkbox
              key={index}
              checked={channels.includes(channel.value)}
              onChange={e => updateReviewAndBuzz(e)}
              value={channel.value}
            >
              {channel.label}
            </Checkbox>
          );
        })}
      </div>

      <TextInput
        title={"Description"}
        textArea
        textAreaHeight={92}
        maxCharacters={560}
        value={channelDescription}
        setValue={value => updateState('channelDescription', value)}
      />

      <div className="save-next-container">
        <div
          className="row-align-center text-grey"
          onClick={() => setStep(STEP_CREATE_QUESTS)}
        >
          <Icon type="left" />
          <div>Back</div>
        </div>
        <SimpleButton text={"Save and Next"} 
          onClick={() => setStep(STEP_CAMPAIGN_BUDGET)}
        />
      </div>
    </div>
  );
};

Step3.propTypes = {};

Step3.defaultProps = {};

export default Step3;
