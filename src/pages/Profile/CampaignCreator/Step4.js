import React, { useContext } from "react";
import PropTypes from "prop-types";
import { BudgetSlider } from "./FormTypes";
import NewCampaignContext from "contexts/NewCampaignContext";

const RewardDetailRow = props => {
  const { title, bounty } = props;
  return (
    <div>
      <div className="reward-detail-row row-align-center">
        <div className="reward-row-tag text-small uppercase text-grey">
          {title}
        </div>
        <div className="reward-row-content">{props.children}</div>
        <div className="text-small text-black">{bounty}</div>
      </div>
      <div className="divider" />
    </div>
  );
};

const Step4 = ({}) => {
  const { totalBudgetAmount, maxRewardAmount, updateState } = useContext(
    NewCampaignContext
  );
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
        onChange={value => updateState("totalBudgetAmount", value)}
      />
      <BudgetSlider
        title={"Max reward per content"}
        value={maxRewardAmount}
        min={500}
        max={1000}
        step={5}
        onChange={value => updateState("maxRewardAmount", value)}
      />

      <div className="reward-details">
        <div>Reward Details</div>
        <RewardDetailRow title={"Quest 1"} bounty={'$1'}>
          <div className="text-black text-small">Make your first bark.</div>
        </RewardDetailRow>
        <RewardDetailRow title={"Quest 2"} bounty={'$2'}>
          <div className="text-black text-small">
            Become a top dog in your territory
          </div>
        </RewardDetailRow>

        <RewardDetailRow title={"Quest 3"} bounty={'$3'}>
          <div className="text-black text-small">Drop a poo message.</div>
        </RewardDetailRow>
        <RewardDetailRow title={"App Review"} bounty={'$5'}>
          <div className="text-black text-small">Drop a poo message.</div>
        </RewardDetailRow>
        <RewardDetailRow title={"Buzz Content"} bounty={'$0 - $500'}>
          <div className="text-black text-small">Youtube</div>
          <div className="text-black text-small">Reddit</div>
          <div className="text-black text-small">Instagram</div>
          <div className="text-black text-small">Twitter</div>
          <div className="text-black text-small">Steemit</div>
        </RewardDetailRow>
      </div>
    </div>
  );
};

Step4.propTypes = {};

Step4.defaultProps = {};

export default Step4;
