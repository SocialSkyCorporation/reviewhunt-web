import React, { useContext } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import NewCampaignContext, {
  NewCampaignProvider,
  NewCampaignConsumer,
  STEP_CREATE_CAMPAIGN,
  STEP_CREATE_QUESTS
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
      default:
        return null;
    }
  };

  return <div className="campaign-creator">{render()}</div>;
};
