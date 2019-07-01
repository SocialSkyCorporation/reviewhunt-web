import React, { useContext } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import NewCampaignContext, {
  STEP_CREATE_CAMPAIGN,
  STEP_CREATE_QUESTS,
  STEP_REVIEW_BUZZ,
  STEP_CAMPAIGN_BUDGET
} from "contexts/NewCampaignContext";
import CircularProgress from "components/CircularProgress";

export default () => {
  const {step, loading} = useContext(NewCampaignContext);

  const render = () => {
    if (loading) {
      return <CircularProgress />;
    }

    switch (step) {
      case STEP_CREATE_CAMPAIGN:
        return <Step1 />;
      case STEP_CREATE_QUESTS:
        return <Step2 />;
      case STEP_REVIEW_BUZZ:
        return <Step3 />;
      case STEP_CAMPAIGN_BUDGET:
        return <Step4 />;
      default:
        return null;
    }
  };

  return <div className="campaign-creator">{render()}</div>;
};
