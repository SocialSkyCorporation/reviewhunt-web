import React, { useContext, Component } from "react";
import { Select, Icon, Menu, notification } from "antd";
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
import CampaignStatus from "./CampaignStatus";
import { numberWithCommas } from "utils/helpers/numberFormatHelper";
import { scrollTop } from "utils/scroller";
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

export const TAB_CREATE_CAMPAIGN = "create_campaign";
export const TAB_CAMPAIGNS = "campaigns";
export const TAB_HISTORY = "history";
export const TAB_SETTINGS = "settings";
export const TAB_CHECKOUT = "checkout";
const tabs = [
  TAB_CREATE_CAMPAIGN,
  TAB_CAMPAIGNS,
  TAB_HISTORY,
  TAB_SETTINGS,
  TAB_CHECKOUT
];
const { SubMenu } = Menu;

class Profile extends Component {
  state = {
    socialChannels: [],
    steemLogo: steemLogoBlack
  };

  componentDidMount() {
    const { setTabIndex, tabIndex, campaignId } = this.props.profileContext;
    const { fetchCampaign } = this.props.campaignContext;

    console.log("tab index", tabIndex);

    scrollTop();

    if (tabIndex === TAB_CAMPAIGNS && campaignId !== null) {
      fetchCampaign(campaignId);
    } else if (!tabs.includes(tabIndex)) {
      setTabIndex(TAB_CREATE_CAMPAIGN);
    }
  }

  renderBanner() {
    const { t } = this.props;
    const { emailMe } = this.props.authContext;
    const { campaigns } = emailMe;
    const { resetState, updateState } = this.props.newCampaignContext;
    const { setCurrentCampaign } = this.props.campaignContext;
    const {
      tabIndex,
      campaignId,
      setCampaignId,
      setTabIndex
    } = this.props.profileContext;

    let numberOfQuests = 0;
    let numberOfCampaigns = campaigns.length;
    let numberOfHunters = 0;
    let reviewCreditSpent = 0;

    campaigns.forEach(
      ({
        quests_count,
        current_participant_count,
        total_bounty,
        bounty_left
      }) => {
        numberOfQuests += quests_count;
        numberOfHunters += current_participant_count;
        reviewCreditSpent += total_bounty - bounty_left;
      }
    );

    return (
      <div className="maker-profile padded-container primary-gradient banner-container">
        <div className="banner-header">{t("profile.my_account")}</div>
        <div className="banner-subheader">{emailMe.name}</div>
        <div className="banner-line" />

        <div className="maker-stat-summary text-black">
          <div>
            <b>{numberOfQuests}</b> quests ran from <b>{numberOfCampaigns}</b>{" "}
            review campaigns
          </div>
          <div>
            <b>{numberOfHunters}</b> hunters have joined your quest
          </div>
          <div>
            A total of <b>${numberWithCommas(reviewCreditSpent)}</b> review
            credit spent.
          </div>
        </div>

        <SimpleButton
          onClick={() => {
            if (tabIndex === TAB_CREATE_CAMPAIGN) return;
            resetState();
            setTabIndex(TAB_CREATE_CAMPAIGN);
            setCurrentCampaign(null);
            updateState("selectedTabKeys", [`campaign-step-0`]);
            setCampaignId(null);
          }}
          text="CREATE CAMPAIGN"
          style={{ marginTop: 20, maxWidth: 160 }}
          backgroundColor="transparent"
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
    const { emailMe } = this.props.authContext;
    const {
      step,
      setStep,
      selectedTabKeys,
      updateState
    } = this.props.newCampaignContext;
    const {
      setCurrentCampaign,
      currentCampaign,
      fetchCampaign
    } = this.props.campaignContext;
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

    const isNewCampaign = tabIndex === TAB_CREATE_CAMPAIGN;

    const editingCampaign =
      tabIndex === TAB_CAMPAIGNS &&
      currentCampaign &&
      currentCampaign.status === "draft";

    const shouldShowSubItems = isNewCampaign || editingCampaign;

    return (
      <div className="tabs">
        <Menu
          onClick={() => {}}
          defaultOpenKeys={["create-campaign", "campaigns", "campaign-steps"]}
          selectedKeys={[...selectedTabKeys, `campaign-step-${step}`]}
          mode="inline"
        >
          {tabIndex === TAB_CREATE_CAMPAIGN && (
            <SubMenu
              key="create-campaign"
              title={
                <span>
                  <span>Create Campaign</span>
                </span>
              }
            >
              {steps.map((s, index) => (
                <Menu.Item
                  key={"campaign-step-" + index}
                  selected={
                    (tabIndex === TAB_CREATE_CAMPAIGN && index === step) ||
                    (tabIndex === TAB_CAMPAIGNS &&
                      campaignId !== null &&
                      index === step)
                  }
                  onClick={() => {
                    if (
                      !currentCampaign &&
                      !this.props.newCampaignContext.campaignId
                    ) {
                      notification["warn"]({
                        message:
                          'You must complete the "Product Description" tab before continuing.'
                      });

                      return;
                    }
                    setStep(index);
                    if (!campaignId) {
                      setTabIndex(TAB_CREATE_CAMPAIGN);
                    }
                  }}
                >
                  {s}
                </Menu.Item>
              ))}
            </SubMenu>
          )}
          <SubMenu
            key="campaigns"
            title={
              <span>
                <span>Campaigns</span>
              </span>
            }
          >
            {campaigns.map((campaign, campaignIndex) => {
              let icon = null;

              switch (campaign.status) {
                case "draft":
                  icon = <Icon type="edit" style={{ color: "#4d4d4d" }} />;
                  break;
                case "submitted":
                  icon = <Icon type="ellipsis" style={{ color: "#f5a623" }} />;
                  break;
                case "paid":
                  icon = <Icon type="dollar" style={{ color: "#52c41a" }} />;
                  break;
                case "request_edit":
                  icon = (
                    <Icon type="issues-close" style={{ color: "#ff597a" }} />
                  );
                  break;
                case "rejected":
                  icon = <Icon type="close" style={{ color: "#ff597a" }} />;
                  break;
                case "refunded":
                  icon = <Icon type="undo" style={{ color: "#52c41a" }} />;
                  break;
                case "converting_hunt":
                  icon = <Icon type="swap" style={{ color: "#fa6f6f" }} />;
                  break;
                case "running":
                  icon = <Icon type="loading" style={{ color: "#3fcaff" }} />;
                  break;
                case "distributing":
                  icon = <Icon type="export" style={{ color: "#52c41a" }} />;
                  break;
                case "completed":
                  icon = <Icon type="file-done" style={{ color: "#4d4d4d" }} />;
                  break;
              }

              if (campaign.status === "draft" && campaign.id == campaignId) {
                const selectedKey = step + "";
                return (
                  <SubMenu
                    key="campaign-steps"
                    title={
                      <span>
                        {icon}
                        <span>{campaign.product_name}</span>
                      </span>
                    }
                    style={{ marginLeft: 16 }}
                  >
                    {steps.map((s, index) => {
                      return (
                        <Menu.Item
                          key={"campaign-step-" + index}
                          onClick={() => {
                            if (
                              !currentCampaign &&
                              !this.props.newCampaignContext.campaignId
                            ) {
                              notification["warn"]({
                                message:
                                  'You must complete the "Product Description" tab before continuing.'
                              });

                              return;
                            }
                            setStep(index);
                            if (!campaignId) {
                              setTabIndex(TAB_CREATE_CAMPAIGN);
                            }
                          }}
                        >
                          {s}
                        </Menu.Item>
                      );
                    })}
                  </SubMenu>
                );
              }

              return (
                <Menu.Item
                  key={`campaign-${campaign.id}`}
                  selected={
                    tabIndex === TAB_CAMPAIGNS && campaign.id == campaignId
                  }
                  onClick={() => {
                    fetchCampaign(campaign.id);
                    setTabIndex(TAB_CAMPAIGNS);
                    setCampaignId(campaign.id);
                    setStep(STEP_CREATE_CAMPAIGN);
                    updateState("selectedTabKeys", [`campaign-${campaign.id}`]);
                  }}
                >
                  {icon}
                  {campaign.product_name}
                </Menu.Item>
              );
            })}
          </SubMenu>
          <Menu.Item
            className="settings-tab"
            key="settings"
            selected={tabIndex === TAB_SETTINGS}
            onClick={() => {
              scrollTop();
              setTabIndex(TAB_SETTINGS);
              updateState("selectedTabKeys", ['settings']);
              setCampaignId(null);
            }}
            style={{ paddingLeft: 0 }}
          >
            Setting
          </Menu.Item>
        </Menu>

        {/*        <TabItem
          text={"History"}
          selected={tabIndex === TAB_HISTORY}
          onClick={() => {
            setTabIndex(TAB_HISTORY);
            setCampaignId(null);
          }}
        />*/}
      </div>
    );
  }

  renderTabContent() {
    const { tabIndex } = this.props.profileContext;

    return (
      <div className="tab-content">
        {tabIndex === TAB_CREATE_CAMPAIGN && this.renderCampaignCreator()}
        {tabIndex === TAB_CAMPAIGNS && this.renderCampaignsTab()}
        {tabIndex === TAB_HISTORY && this.renderHistoryTab()}
        {tabIndex === TAB_SETTINGS && this.renderSettings()}
        {tabIndex === TAB_CHECKOUT && this.renderCheckout()}
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
    } else if (status === "draft") {
      return <CampaignCreator data={currentCampaign} />;
    } else {
      return <CampaignStatus data={currentCampaign} />;
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
