import React, { Component } from "react";
import { Select } from "antd";
import TabItem from "./TabItem";
import QuestItem from "./QuestItem";
import CurrentQuest from "./CurrentQuest";
import ProgressBar from "components/ProgressBar";
import SimpleButton from "components/SimpleButton";
import steemLogoBlack from "assets/images/steem-logo-bk.svg";
import { withTranslation } from "react-i18next";
import CampaignCreator from './CampaignCreator';

const TAB_CREATE_CAMPAIGN = 0;
const TAB_CAMPAIGNS = 1;
const TAB_HISTORY = 2;
const TAB_SETTINGS = 3;

class Profile extends Component {
  state = {
    tabIndex: 0,
    editProfile: false,
    socialChannels: [],
    currentQuest: null,
    steemLogo: steemLogoBlack
  };

  renderBanner() {
    const { t } = this.props;
    return (
      <div className="maker-profile padded-container primary-gradient banner-container">
        <div className="banner-header">{t("profile.my_account")}</div>
        <div className="banner-subheader">Sebastian</div>
        <div className="banner-line" />

        <div>
          <div>
            <span>10</span> quests ran from <span>2</span> review campaigns
          </div>
          <div>
            <span>2,205</span> hunters have joined your quest
          </div>
          <div>
            A total of <span>$20,500</span> review credit spent.
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
    const { tabIndex } = this.state;
    const { t } = this.props;
    return (
      <div className="tabs">
        <TabItem
          text="Create Campaign"
          selected={tabIndex === 0}
          onClick={() => this.setState({ tabIndex: 0 })}
        />
        <TabItem
          text={"Campaigns"}
          selected={tabIndex === 1}
          onClick={() => this.setState({ tabIndex: 1 })}
        />
        <TabItem
          text={"History"}
          selected={tabIndex === 2}
          onClick={() => this.setState({ tabIndex: 2 })}
        />
        <TabItem
          text={"Setting"}
          selected={tabIndex === 3}
          onClick={() => this.setState({ tabIndex: 3 })}
        />
      </div>
    );
  }

  renderTabContent() {
    const { tabIndex } = this.state;

    return (
      <div className="tab-content">
        {tabIndex === TAB_CREATE_CAMPAIGN && this.renderProfileTab()}
        {tabIndex === TAB_CAMPAIGNS && this.renderChannelsTab()}
        {tabIndex === TAB_HISTORY && this.renderQuestTab()}
        {tabIndex === TAB_SETTINGS && this.renderQuestTab()}
      </div>
    );
  }

  renderProfileTab() {
    const { t } = this.props;

    return (
      <>
        <ProgressBar height={8} progress={30} />
        <div className="content-quest">
        <CampaignCreator/>
        </div>
      </>
    );
  }

  renderChannelsTab() {
    const { t } = this.props;
    return (
      <div className="content-quest">
        <div className="content-title text-black">
          {t("profile.your_channels")}
        </div>
      </div>
    );
  }

  renderQuestTab() {
    const { currentQuest } = this.state;
    const { t } = this.props;

    if (currentQuest) {
      return (
        <>
          <ProgressBar height={8} progress={30} />
          <div className="content-quest">
            <CurrentQuest
              onBackPressed={() => this.setState({ currentQuest: null })}
            />
          </div>
        </>
      );
    }

    return (
      <div className="content-quest">
        <div className="content-title text-black">
          {t("profile.your_quests")}
        </div>
        <Select className="category-select" defaultValue={t("all")} />
        <QuestItem
          steps={[1, 2, 3, "review", "buzz"]}
          currentStep={1}
          onClick={() => this.setState({ currentQuest: 1 })}
        />
        <QuestItem
          steps={[1, 2, 3, "review", "buzz"]}
          currentStep={3}
          onClick={() => this.setState({ currentQuest: 1 })}
        />
        <QuestItem steps={[1, 2, 3, "review", "buzz"]} currentStep={3} />
        <QuestItem steps={[1, 2, "review", "buzz"]} currentStep={5} />
        <QuestItem steps={[1, 2, "review", "buzz"]} currentStep={3} ended />
        <QuestItem steps={[1, 2, "review", "buzz"]} currentStep={4} ended />
      </div>
    );
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

export default withTranslation()(Profile);
