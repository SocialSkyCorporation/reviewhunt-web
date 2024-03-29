import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Icon } from "antd";
import { BudgetSlider } from "components/FormTypes";
import NewCampaignContext, {
  STEP_CAMPAIGN_BUDGET,
  STEP_CONFIRM,
  STEP_REVIEW_BUZZ
} from "contexts/NewCampaignContext";
import hunterImg from "assets/images/hunter-circle.svg";
import reviewImg from "assets/images/review-circle.svg";
import buzzImg from "assets/images/buzz-circle.svg";
import reachImg from "assets/images/reach-circle.svg";
import SimpleButton from "components/SimpleButton";
import { numberWithCommas } from "utils/helpers/numberFormatHelper";
import appstoreImg from "assets/images/appstore.svg";
import playstoreImg from "assets/images/playstore.svg";
import { filterBuzzQuests } from "utils/helpers/campaignHelper";

const questDictionary = {
  general_1: "QUEST 1",
  general_2: "QUEST 2",
  general_3: "QUEST 3",
  review: "App review",
  buzz: "Buzz content"
};

const RewardDetailRow = props => {
  const { title, bounty } = props;
  return (
    <div>
      <div className="reward-detail-row row-align-center">
        <div className="reward-row-tag uppercase text-grey">{title}</div>
        <div className="reward-row-content">{props.children}</div>
        <div className="text-black">{bounty}</div>
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
        <div className="text-grey">{title}</div>
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
    campaignInfo,
    campaignId,
    setCampaignBudget
  } = useContext(NewCampaignContext);

  useEffect(() => {
    if (campaignId) {
      fetchEstimate();
    }
  }, [fetchEstimate, campaignId]);

  const buzzQuests = quests.filter(filterBuzzQuests);

  return (
    <div className="campaign-step">
      <div className="text-grey">Step 4 of 5</div>
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
      {buzzQuests.length > 0 && (
        <BudgetSlider
          title={"Max reward per content"}
          value={maxRewardAmount}
          min={10}
          max={10000}
          step={5}
          onChange={value => {
            updateState("fetchingEstimate", true);
            updateState("maxRewardAmount", value);
            fetchEstimate();
          }}
        />
      )}

      <div className="reward-details">
        <div className="text-black reward-details-text">Reward Details</div>

        {quests.map(
          ({ allowed_channels, quest_type, title, bounty_base, bounty_max }, index) => {
            switch (quest_type) {
              case "general_1":
              case "general_2":
              case "general_3":
                return (
                  <RewardDetailRow
                    key={quest_type}
                    title={questDictionary[quest_type]}
                    bounty={bounty_max ? `$${numberWithCommas(bounty_max)}` : 0}
                  >
                    <div className="text-black">{title}</div>
                  </RewardDetailRow>
                );
              case "review":
                return (
                  <RewardDetailRow
                    key={quest_type}
                    title={"App Review"}
                    bounty={bounty_max ? `$${numberWithCommas(bounty_max)}` : 0}
                  >
                    <div className="col">
                      <div>
                        <div className="row-align-center">
                          <div className="url-icon-circle">
                            <img src={appstoreImg} alt="" />
                          </div>
                          {campaignInfo.urls.appstore ? (
                            <a
                              className="url-href"
                              href={campaignInfo.urls.appstore}
                            >
                              {campaignInfo.urls.appstore}
                            </a>
                          ) : (
                            <div className="row-align-center">
                              <div className="url-desc text-grey">
                                Not registered
                              </div>
                              <div
                                className="url-href hover-link"
                                onClick={() => {
                                  setStep(0);
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
                            {campaignInfo.urls.playstore ? (
                              <a
                                className="url-href"
                                href={campaignInfo.urls.playstore}
                              >
                                {campaignInfo.urls.playstore}
                              </a>
                            ) : (
                              <div className="row-align-center">
                                <div className="url-desc text-grey">
                                  Not registered
                                </div>
                                <div
                                  className="url-href hover-link"
                                  onClick={() => {
                                    setStep(0);
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
                );

              case "buzz":
                return (
                  <RewardDetailRow
                    key={quest_type}
                    title={"Buzz Content"}
                    bounty={bounty_max ? `$${bounty_base} - $${numberWithCommas(bounty_max)}` : 0}
                  >
                    {allowed_channels.map((channel, index) => {
                      return (
                        <div key={index} className="text-black">
                          {channel}
                        </div>
                      );
                    })}
                  </RewardDetailRow>
                );
              default:
            }
          }
        )}

        <div>
          <div className="max-result-text text-grey uppercase">Estimation</div>
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
        <div
          className="row-align-center text-grey"
          onClick={() => setStep(STEP_REVIEW_BUZZ)}
        >
          <Icon type="left" />
          <div>Back</div>
        </div>
        <SimpleButton
          text={"Save and Next"}
          onClick={() => setCampaignBudget()}
        />
      </div>
    </div>
  );
};

Step4.propTypes = {};

Step4.defaultProps = {};

export default Step4;
