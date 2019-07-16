import React, { useContext, Component } from "react";
import { Select } from "antd";
import TabItem, { TabSubItem } from "../TabItem";
import QuestItem from "../QuestItem";
import CurrentQuest from "../CurrentQuest";
import CampaignDashboard from "./CampaignDashboard";
import HistoryTab from "./HistoryTab";
import SettingTab from "./SettingTab";
import ProgressBar from "components/ProgressBar";
import SimpleButton from "components/SimpleButton";
import steemLogoBlack from "assets/images/steem-logo-bk.svg";
import { withTranslation } from "react-i18next";
import CampaignCreator from "../CampaignCreator";
import {
  withAuthContext,
  withNewCampaignContext,
  withCampaignContext,
  withProfileContext
} from "contexts/HOC";
import CircularProgress from "components/CircularProgress";

import {
  STEP_CREATE_CAMPAIGN,
  STEP_CREATE_QUESTS
} from "contexts/NewCampaignContext";

const TAB_CREATE_CAMPAIGN = 0;
const TAB_CAMPAIGNS = 1;
const TAB_HISTORY = 2;
const TAB_SETTINGS = 3;
const TAB_CHECKOUT = 4;

class Profile extends Component {
  state = {
    editProfile: false,
    socialChannels: [],
    steemLogo: steemLogoBlack
  };

  componentDidMount() {
    const { tabIndex, campaignId } = this.props.profileContext;
    const { fetchCampaign } = this.props.campaignContext;

    if (tabIndex == TAB_CAMPAIGNS && campaignId !== null) {
      fetchCampaign(campaignId);
    }
  }

  renderBanner() {
    const { t } = this.props;
    const { emailMe } = this.props.authContext;
    return (
      <div className="maker-profile padded-container primary-gradient banner-container">
        <div className="banner-header">{t("profile.my_account")}</div>
        <div className="banner-subheader">{emailMe.name}</div>
        <div className="banner-line" />

        <div className="maker-stat-summary text-black">
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

        <SimpleButton
          text="CREATE CAMPAIGN"
          style={{ marginTop: 20, maxWidth: 160 }}
        />
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
    const {
      tabIndex,
      campaignId,
      setCampaignId,
      setTabIndex
    } = this.props.profileContext;
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
      "Review",
      "Checkout"
    ];

    return (
      <div className="tabs">
        <TabItem
          text="Create Campaign"
          selected={tabIndex == TAB_CREATE_CAMPAIGN}
          style={
            tabIndex == TAB_CREATE_CAMPAIGN || campaignId
              ? { marginBottom: 0 }
              : {}
          }
          onClick={() => {
            resetState();
            setTabIndex(TAB_CREATE_CAMPAIGN);
            setCampaignId(null);
          }}
        />

        {(tabIndex == TAB_CREATE_CAMPAIGN || campaignId !== null) && (
          <div>
            {steps.map((s, index) => (
              <TabSubItem
                key={index}
                selected={
                  (tabIndex == TAB_CREATE_CAMPAIGN && index === step) ||
                  (tabIndex == TAB_CAMPAIGNS &&
                    campaignId !== null &&
                    index === step)
                }
                onClick={() => {
                  setStep(index);
                  if (!campaignId) {
                    setTabIndex(TAB_CREATE_CAMPAIGN);
                  }
                }}
                text={s}
              />
            ))}
          </div>
        )}
        <TabItem
          text={"Campaigns"}
          selected={tabIndex == TAB_CAMPAIGNS}
          style={{ marginBottom: 0 }}
        />

        <div>
          {campaigns.map((campaign, index) => (
            <TabSubItem
              key={campaign.id}
              selected={
                tabIndex == TAB_CAMPAIGNS && campaign.id == campaignId
              }
              onClick={() => {
                fetchCampaign(campaign.id);
                setTabIndex(TAB_CAMPAIGNS);
                setCampaignId(campaign.id);
              }}
              text={campaign.product_name}
            />
          ))}
        </div>
        <TabItem
          text={"History"}
          selected={tabIndex == TAB_HISTORY}
          onClick={() => {
            setTabIndex(TAB_HISTORY);
            setCampaignId(null);
          }}
        />
        <TabItem
          text={"Setting"}
          selected={tabIndex == TAB_SETTINGS}
          onClick={() => {
            setTabIndex(TAB_SETTINGS);
            setCampaignId(null);
          }}
        />
        <TabItem
          text={"Logout"}
          selected={tabIndex == 4}
          onClick={() => logout()}
        />
      </div>
    );
  }

  renderTabContent() {
    const { tabIndex } = this.props.profileContext;

    return (
      <div className="tab-content">
        {tabIndex == TAB_CREATE_CAMPAIGN && this.renderCampaignCreator()}
        {tabIndex == TAB_CAMPAIGNS && this.renderCampaignsTab()}
        {tabIndex == TAB_HISTORY && this.renderHistoryTab()}
        {tabIndex == TAB_SETTINGS && this.renderSettings()}
        {tabIndex == TAB_CHECKOUT && this.renderCheckout()}
      </div>
    );
  }

  renderSettings() {
    return <SettingTab />;
  }

  renderCampaignCreator() {
    return <CampaignCreator />;
  }

  renderHistoryTab() {
    return <HistoryTab />;
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
    if (status === "running") {
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
  withCampaignContext(
    withNewCampaignContext(withAuthContext(withProfileContext(Profile)))
  )
);
