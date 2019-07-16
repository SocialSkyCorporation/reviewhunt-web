import React, { useEffect, useContext } from "react";
import { useBeforeunload } from 'react-beforeunload';
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import NewCampaignContext, {
  STEP_CREATE_CAMPAIGN,
  STEP_CREATE_QUESTS,
  STEP_REVIEW_BUZZ,
  STEP_CAMPAIGN_BUDGET,
  STEP_CONFIRM,
  STEP_CHECKOUT
} from "contexts/NewCampaignContext";
import CircularProgress from "components/CircularProgress";
import ProgressBar from "components/ProgressBar";
import _ from "lodash";

export default props => {
  const { data } = props;
  const { step, loading, setCampaignData } = useContext(NewCampaignContext);
  
  // useBeforeunload(event => event.preventDefault());

  useEffect(() => {
    //if data is passed, it means it's being edited
    if (data) {
      setCampaignData(data);
    }
  }, [data]);

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
      case STEP_CONFIRM:
        return <Step5 />;
      case STEP_CHECKOUT:
        return <Step6 />;
      default:
        return null;
    }
  };

  return (
    <>
      <ProgressBar height={8} progress={(step / 5) * 100} />
      <div className="content-quest">
        <div className="campaign-creator">{render()}</div>
      </div>
    </>
  );
};
