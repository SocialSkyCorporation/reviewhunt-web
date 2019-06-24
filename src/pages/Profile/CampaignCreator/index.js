import React, { Component } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import { NewCampaignProvider, NewCampaignConsumer } from "./NewCampaignContext";

export default class CampaignCreator extends Component {
  renderStep = () => {
    return (
      <NewCampaignConsumer>
        {({ step }) => {
          switch (step) {
            case 1:
              return <Step1 />;
            case 2:
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
