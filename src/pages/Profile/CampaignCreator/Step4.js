import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Icon } from "antd";
import { BudgetSlider } from "./FormTypes";
import NewCampaignContext from "contexts/NewCampaignContext";
import hunterImg from "assets/images/hunter-circle.svg";
import reviewImg from "assets/images/review-circle.svg";
import buzzImg from "assets/images/buzz-circle.svg";
import reachImg from "assets/images/reach-circle.svg";
import SimpleButton from "components/SimpleButton";
import { numberWithCommas } from "utils/helpers/numberFormatHelper";
import appstoreImg from "assets/images/appstore.svg";
import playstoreImg from "assets/images/playstore.svg";

const RewardDetailRow = props => {
  const { title, bounty } = props;
  return (
    <div>
      <div className="reward-detail-row row-align-center">
        <div className="reward-row-tag text-small uppercase text-grey">
          {title}
        </div>
        <div className="reward-row-content">{props.children}</div>
        <div className="text-small text-black">{numberWithCommas(bounty)}</div>
      </div>
      <div className="divider" />
    </div>
  );
};

const IconDetail = props => {
  const { title, value, image } = props;
  return (
    <div className="icon-detail-item row-align-center">
      <img className="icon-detail-logo" src={image} alt="" />
      <div className="icon-detail-text">
        <div className="text-small text-grey">{title}</div>
        <div className="text-big text-black">{numberWithCommas(value)}</div>
      </div>
    </div>
  );
};

const Step4 = ({}) => {
  const {
    quests,
    totalBudgetAmount,
    maxRewardAmount,
    updateState,
    setStep,
    estimate,
    fetchEstimate,
    fetchingEstimate,
    campaignInfo
  } = useContext(NewCampaignContext);
  return (
    <div className="campaign-step">
      <div className="text-grey text-small">Step 4 of 5</div>
      <div className="step-title text-black">Set Campaign Budget</div>
      <BudgetSlider
        title={"Total budget amount"}
        value={totalBudgetAmount}
        min={1000}
        max={20000}
        step={10}
        onChange={value => {
          updateState("fetchingEstimate", true);
          updateState("totalBudgetAmount", value);
          fetchEstimate();
        }}
      />
      <BudgetSlider
        title={"Max reward per content"}
        value={maxRewardAmount}
        min={500}
        max={1000}
        step={5}
        onChange={value => {
          updateState("fetchingEstimate", true);
          updateState("maxRewardAmount", value);
          fetchEstimate();
        }}
      />

      <div className="reward-details">
        <div className="text-black text-big reward-details-text">Reward Details</div>

        {quests.map((quest, index) => {
          return (
            <RewardDetailRow key={index} title={"TODO"} bounty={"$1"}>
              <div className="text-black text-small">Make your first bark.</div>
            </RewardDetailRow>
          );
        })}

        <RewardDetailRow title={"Quest 1"} bounty={"$1"}>
          <div className="text-black text-small">Make your first bark.</div>
        </RewardDetailRow>
        <RewardDetailRow title={"Quest 2"} bounty={"$2"}>
          <div className="text-black text-small">
            Become a top dog in your territory
          </div>
        </RewardDetailRow>

        <RewardDetailRow title={"Quest 3"} bounty={"$3"}>
          <div className="text-black text-small">Drop a poo message.</div>
        </RewardDetailRow>
        <RewardDetailRow title={"App Review"} bounty={"$5"}>
          <div className="col">
            <div>
              <div className="row-align-center">
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
                        setStep(1);
                      }}
                    >
                      Register
                    </div>
                  </div>
                )}
              </div>

              <div className="app-review-item">
                <div className="row-align-center">
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
                          setStep(1);
                        }}
                      >
                        Register
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </RewardDetailRow>
        <RewardDetailRow title={"Buzz Content"} bounty={"$0 - $500"}>
          <div className="text-black text-small">Youtube</div>
          <div className="text-black text-small">Reddit</div>
          <div className="text-black text-small">Instagram</div>
          <div className="text-black text-small">Twitter</div>
          <div className="text-black text-small">Steemit</div>
        </RewardDetailRow>

        <div>
          <div className="max-result-text text-grey text-small">MAX RESULT</div>
          {fetchingEstimate ? (
            <Icon type="loading" style={{ marginTop: 8 }} />
          ) : (
            <div className="icon-detail-container">
              <IconDetail
                image={hunterImg}
                title={"Hunters"}
                value={estimate.participant_count}
              />
              <IconDetail
                image={reviewImg}
                title={"App Store Reviews"}
                value={estimate.appstore_review_count}
              />
              <IconDetail
                image={buzzImg}
                title={"Buzz Content"}
                value={estimate.buzz_content_count}
              />
              <IconDetail
                image={reachImg}
                title={"Content Reach"}
                value={estimate.total_reach}
              />
            </div>
          )}
        </div>
      </div>
      <div className="save-next-container">
        <div className="row-align-center text-grey" onClick={() => setStep(1)}>
          <Icon type="left" />
          <div>Back</div>
        </div>
        <SimpleButton text={"Save and Next"} />
      </div>
    </div>
  );
};

Step4.propTypes = {};

Step4.defaultProps = {};

export default Step4;
