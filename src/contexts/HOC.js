import React from "react";
import { AuthConsumer } from "./AuthContext";
import { NewCampaignConsumer } from "contexts/NewCampaignContext";
import { CampaignConsumer } from "contexts/CampaignContext";
import { HunterDashboardConsumer } from "contexts/HunterDashboardContext";

export function withAuthContext(Component) {
  return function WrapperComponent(props) {
    return (
      <AuthConsumer>
        {state => <Component {...props} authContext={state} />}
      </AuthConsumer>
    );
  };
}

export function withNewCampaignContext(Component) {
  return function WrapperComponent(props) {
    return (
      <NewCampaignConsumer>
        {state => <Component {...props} newCampaignContext={state} />}
      </NewCampaignConsumer>
    );
  };
}

export function withHunterDashboardContext(Component) {
  return function WrapperComponent(props) {
    return (
      <HunterDashboardConsumer>
        {state => <Component {...props} hunterDashboardContext={state} />}
      </HunterDashboardConsumer>
    );
  };
}

export function withCampaignContext(Component) {
  return function WrapperComponent(props) {
    return (
      <CampaignConsumer>
        {state => <Component {...props} campaignContext={state} />}
      </CampaignConsumer>
    );
  };
}


