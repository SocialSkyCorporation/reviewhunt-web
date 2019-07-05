import React, { useContext, Component } from "react";
import { Select } from "antd";
import TabItem, { TabSubItem } from "../TabItem";
import QuestItem from "../QuestItem";
import CurrentQuest from "../CurrentQuest";
import CampaignDashboard from "./CampaignDashboard";
import ProgressBar from "components/ProgressBar";
import SimpleButton from "components/SimpleButton";
import steemLogoBlack from "assets/images/steem-logo-bk.svg";
import { withTranslation } from "react-i18next";
import CampaignCreator from "../CampaignCreator";
import {
  withAuthContext,
  withNewCampaignContext,
  withCampaignContext
} from "contexts/HOC";
import CircularProgress from "components/CircularProgress";

import NewCampaignContext, {
  STEP_CREATE_CAMPAIGN,
  STEP_CREATE_QUESTS
} from "contexts/NewCampaignContext";

const TAB_CREATE_CAMPAIGN = 0;
const TAB_CAMPAIGNS = 1;
const TAB_HISTORY = 2;
const TAB_SETTINGS = 3;

class Profile extends Component {
  state = {
    tabIndex: 1,
    selectedCampaignId: -1,
    editProfile: false,
    socialChannels: [],
    steemLogo: steemLogoBlack
  };

  renderBanner() {
    const { t } = this.props;
    return (
      <div className="maker-profile padded-container primary-gradient banner-container">
        <div className="banner-header">{t("profile.my_account")}</div>
        <div className="banner-subheader">Sebastian</div>
        <div className="banner-line" />

        <div className="bold-span">
          <div>
            <b>10</b> quests ran from <b>2</b> review campaigns
          </div>
          <div>
            <b>2,205</b> hunters have joined your quest
          </div>
          <div>
            A total of <b>$20,500</b> review credit spent.
          </div>
        </div>

        <SimpleButton text="CREATE CAMPAIGN" style={{ marginTop: 20 }} />
      </div>
    );
  }

  renderContent() {
    return (
      <div className="padded-container tab-container">
        {this.renderTabs()}
        {this.renderTabContent()}
      </div>
    );
  }

  renderTabs() {
    const { tabIndex, selectedCampaignId } = this.state;
    const { t } = this.props;
    const { logout, emailMe } = this.props.authContext;
    const { step, setStep } = this.props.newCampaignContext;
    const { fetchCampaign } = this.props.campaignContext;
    const { resetState } = this.props.newCampaignContext;
    const { campaigns } = emailMe;

    const steps = [
      "Product Description",
      "Design Quests",
      "Review and Buzz",
      "Campaign Budget",
      "Review"
    ];

    return (
      <div className="tabs">
        <TabItem
          text="Create Campaign"
          selected={tabIndex === 0}
          style={{ marginBottom: 0 }}
          onClick={() => {
            resetState();
            this.setState({ tabIndex: 0, selectedCampaignId: -1 });
          }}
        />

        <div>
          {steps.map((s, index) => (
            <TabSubItem
              key={index}
              selected={tabIndex === 0 && index === step}
              onClick={() => {
                setStep(index);
                this.setState({ tabIndex: 0 });
              }}
              text={s}
            />
          ))}
        </div>

        <TabItem
          text={"Campaigns"}
          selected={tabIndex === 1}
          style={{ marginBottom: 0 }}
        />

        <div>
          {campaigns.map((campaign, index) => (
            <TabSubItem
              key={campaign.id}
              selected={tabIndex === 1 && campaign.id === selectedCampaignId}
              onClick={() => {
                fetchCampaign(campaign.id);
                this.setState({ tabIndex: 1, selectedCampaignId: campaign.id });
              }}
              text={campaign.product_name}
            />
          ))}
        </div>
        <TabItem
          text={"History"}
          selected={tabIndex === 2}
          onClick={() => this.setState({ tabIndex: 2, selectedCampaignId: -1 })}
        />
        <TabItem
          text={"Setting"}
          selected={tabIndex === 3}
          onClick={() => this.setState({ tabIndex: 3, selectedCampaignId: -1 })}
        />
        <TabItem
          text={"Logout"}
          selected={tabIndex === 4}
          onClick={() => logout()}
        />
      </div>
    );
  }

  renderTabContent() {
    const { tabIndex } = this.state;

    return (
      <div className="tab-content">
        {tabIndex === TAB_CREATE_CAMPAIGN && this.renderCampaignCreator()}
        {tabIndex === TAB_CAMPAIGNS && this.renderCampaignsTab()}
        {tabIndex === TAB_HISTORY && this.renderCampaignsTab()}
        {tabIndex === TAB_SETTINGS && this.renderCampaignsTab()}
      </div>
    );
  }

  renderCampaignCreator() {
    return <CampaignCreator />;
  }

  renderCampaignsTab() {
    const { t } = this.props;
    const { setStep } = this.props.newCampaignContext;
    const {
      fetchingCampaign,
      currentCampaign,
      submittedQuests
    } = this.props.campaignContext;

    if (fetchingCampaign || !currentCampaign) {
      return (
        <div className="content-dashboard">
          <CircularProgress />
        </div>
      );
    }

    const { status } = currentCampaign;

    //TEST
    if (true || status === "running") {
      return (
        <CampaignDashboard
          onEditDescClicked={() => {
            this.setState({ tabIndex: TAB_CREATE_CAMPAIGN });
            setStep(STEP_CREATE_CAMPAIGN);
          }}
          onEditQuestClicked={() => {
            this.setState({ tabIndex: TAB_CREATE_CAMPAIGN });
            setStep(STEP_CREATE_QUESTS);
          }}
          submittedQuests={submittedQuests}
        />
      );
    } else {
      return <CampaignCreator data={currentCampaign} />;
    }
  }

  render() {
    return (
      <div className="profile-page">
        {this.renderBanner()}
        {this.renderContent()}
      </div>
    );
  }
}

export default withTranslation()(
  withCampaignContext(withNewCampaignContext(withAuthContext(Profile)))
);
