import React, { Component } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import {
  NewCampaignProvider,
  NewCampaignConsumer,
  STEP_CREATE_CAMPAIGN,
  STEP_CREATE_QUESTS
} from "./NewCampaignContext";
import CircularProgress from "components/CircularProgress";

export default class CampaignCreator extends Component {
  renderStep = () => {
    return (
      <NewCampaignConsumer>
        {({ step, loading }) => {
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
        }}
      </NewCampaignConsumer>
    );
  };

  render() {
    return (
      <NewCampaignProvider>
        <div className="campaign-creator">{this.renderStep()}</div>
      </NewCampaignProvider>
    );
  }
}
