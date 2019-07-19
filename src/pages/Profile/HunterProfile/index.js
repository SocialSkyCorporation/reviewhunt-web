import React, { Component } from "react";
import { Icon, Select, notification } from "antd";
import moneyImg from "assets/images/money-circle.svg";
import crownImg from "assets/images/crown-circle.svg";
import TabItem from "../TabItem";
import ProfileRow, {
  TYPE_DROPDOWN,
  TYPE_PASSWORD
} from "../ProfileRow";
import QuestItem from "../QuestItem";
import CurrentQuest from "../CurrentQuest";
import ProgressBar from "components/ProgressBar";
import SimpleButton from "components/SimpleButton";
import { AuthConsumer } from "contexts/AuthContext";
import steemLogoWhite from "assets/images/steem-logo.svg";
import steemLogoBlack from "assets/images/steem-logo-bk.svg";
import { getLoginURL } from "utils/token";
import {
  withAuthContext,
  withProfileContext,
  withHunterDashboardContext
} from "contexts/HOC";
import { withTranslation } from "react-i18next";
import { countries } from "utils/constants";
import api from "utils/api";
import Wallet from "./Wallet";
import BuzzChannels from "./BuzzChannels";
import { TYPE_HUNTER } from "pages/Auth";
import { extractErrorMessage } from "utils/errorMessage";
import CircularProgress from "components/CircularProgress";

const { Option } = Select;

export const TAB_PROFILE = "profile";
export const TAB_QUEST = "quest";
export const TAB_WALLET = "wallet";
export const TAB_CHANNELS = "channels";

class HunterProfile extends Component {
  state = {
    socialChannels: [],
    steemLogo: steemLogoBlack
  };

  componentDidMount() {
    const { tabIndex } = this.props.profileContext;
    const { getCampaigns } = this.props.hunterDashboardContext;

    if (tabIndex === TAB_QUEST) {
      getCampaigns();
    }
  }

  renderBanner() {
    const { t } = this.props;
    const { emailMe } = this.props.authContext;
    return (
      <div className="padded-container primary-gradient banner-container">
        <div className="banner-header">
          {t("profile.my_account").toUpperCase()}
        </div>
        <div className="banner-subheader">{emailMe.name}</div>
        <div className="banner-line" />

        <div className="summary-container">
          <div className="summary-item">
            <img className="summary-icon" src={crownImg} alt="" />
            <div className="text-container">
              <div className="summary-title">{t("profile.top")} 3.5%</div>
              <div className="summary-subtitle">
                {t("profile.buzz_performance")}
              </div>
            </div>
          </div>
          <div className="summary-item">
            <img className="summary-icon" src={moneyImg} alt="" />
            <div className="text-container">
              <div className="summary-title">$5,055</div>
              <div className="summary-subtitle">
                {t("profile.earned_bounty")}
              </div>
            </div>
          </div>
        </div>
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
    const { t } = this.props;
    const { getCampaigns } = this.props.hunterDashboardContext;
    const { setTabIndex, tabIndex } = this.props.profileContext;
    const { getSocialChannels } = this.props.authContext;

    return (
      <div className="tabs">
        <TabItem
          text={t("profile_tab")}
          selected={tabIndex === TAB_PROFILE}
          onClick={() => {
            if (tabIndex === TAB_PROFILE) return;
            setTabIndex(TAB_PROFILE);
          }}
        />
        {/*<TabItem
          text={"Channels"}
          selected={tabIndex ==== 1}
          onClick={() => this.setState({ tabIndex: 1 })}
        />*/}
        <TabItem
          text={t("profile.quest_dashboard")}
          selected={tabIndex === TAB_QUEST}
          onClick={() => {
            if (tabIndex === TAB_QUEST) return;
            setTabIndex(TAB_QUEST);
            getCampaigns();
          }}
        />
        <TabItem
          text={t("profile.wallet")}
          selected={tabIndex === TAB_WALLET}
          onClick={() => {
            if (tabIndex === TAB_WALLET) return;
            setTabIndex(TAB_WALLET);
          }}
        />
        <TabItem
          text={"Buzz Channels"}
          selected={tabIndex === TAB_CHANNELS}
          onClick={() => {
            if (tabIndex === TAB_CHANNELS) return;
            setTabIndex(TAB_CHANNELS);
          }}
        />
      </div>
    );
  }

  renderTabContent() {
    const { tabIndex } = this.props.profileContext;

    return (
      <div className="tab-content">
        {tabIndex === TAB_PROFILE && this.renderProfileTab()}
        {tabIndex === TAB_QUEST && this.renderQuestTab()}
        {tabIndex === TAB_WALLET && this.renderWallet()}
        {tabIndex === TAB_CHANNELS && this.renderChannelsTab()}
      </div>
    );
  }

  renderProfileTab() {
    const { editProfile, steemLogo } = this.state;
    const { t } = this.props;
    const {
      emailMe,
      steemMe,
      steemconnectLoading,
      disconnectSteem
    } = this.props.authContext;
    const countryArray = countries.filter(
      country => country.code === emailMe.country_code
    );
    const country =
      countryArray && countryArray.length > 0 && countryArray[0].value;

    return (
      <div>
        <div className="steem-connect">
          {steemMe ? (
            <div className="row-align-center row-space-between col-on-mobile steem-connected-container">
              <div>
                <div className="content-title text-black">{t("steem_steemhunt")}</div>
                <div className="profile-icon-container row-align-center">
                  <img
                    className="profile-icon"
                    src={`${process.env.REACT_APP_STEEMCONNECT_IMG_HOST}/@${steemMe.user}?s=80`}
                    alt=""
                  />
                  <div className="profile-icon-text text-black">
                    {steemMe.name}
                  </div>
                </div>
              </div>
              <div>
                <SimpleButton
                  onClick={() => disconnectSteem()}
                  className="steem-connect-button"
                  text={t("disconnect").toUpperCase()}
                />
              </div>
            </div>
          ) : (
            <div>
              <div className="row-align-center row-space-between col-on-mobile">
                <div>
                  <div className="content-title steemhunt text-black">
                    STEEMHUNT (STEEM) ACCOUNT
                  </div>
                  <div className="profile-icon-container profile-icon-text text-grey">
                    Connect your Reviewhunt account to your Steem account for
                    syncing the HUNT transactions.
                  </div>
                </div>
                <div>
                  <a href={steemconnectLoading ? null : getLoginURL()}>
                    <SimpleButton
                      className="steem-connect-button"
                      onMouseOver={() =>
                        this.setState({ steemLogo: steemLogoWhite })
                      }
                      onMouseOut={() =>
                        this.setState({ steemLogo: steemLogoBlack })
                      }
                      icon={
                        steemconnectLoading ? (
                          <Icon type="sync" spin />
                        ) : (
                          <img
                            src={steemLogo}
                            alt=""
                            style={{ marginRight: 4 }}
                          />
                        )
                      }
                      text={steemconnectLoading ? "" : "CONNECT"}
                    />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="content-profile">
          <div className="content-title text-black">
            {t("profile.basic_information").toUpperCase()}
          </div>
          <ProfileRow
            title={t("name")}
            value={emailMe.name}
            editMode={editProfile}
          />
          <ProfileRow
            title={t("email")}
            value={emailMe.email}
            editMode={editProfile}
          />
          <ProfileRow
            title={t("country")}
            value={country}
            editMode={editProfile}
            type={TYPE_DROPDOWN}
          >
            {countries.map((c, i) => (
              <Option key={c.code}>{c.value}</Option>
            ))}
          </ProfileRow>
          <ProfileRow
            title={t("password")}
            value="password"
            editMode={editProfile}
            type={TYPE_PASSWORD}
            password={true}
          />

          <div className="button-container">
            <SimpleButton
              onClick={() => this.setState({ editProfile: !editProfile })}
              text={
                editProfile
                  ? t("submit").toUpperCase()
                  : t("profile.edit_profile").toUpperCase()
              }
            />
            {editProfile && (
              <div
                className="cancel-button"
                onClick={() => this.setState({ editProfile: false })}
              >
                {t("cancel").toUpperCase()}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  renderChannelsTab() {
    const { t } = this.props;
    return <BuzzChannels />;
  }

  renderQuestTab() {
    const { t } = this.props;
    const {
      setCurrentCampaign,
      fetchingQuest,
      currentCampaign,
      campaigns
    } = this.props.hunterDashboardContext;

    if (currentCampaign) {
      return (
        <>
          <ProgressBar height={8} progress={30} />
          <div className="content-quest">
            <CurrentQuest
              data={currentCampaign}
              onBackPressed={() => setCurrentCampaign(null)}
            />
          </div>
        </>
      );
    }

    if (fetchingQuest) {
      return (
        <div className="content-quest">
          <CircularProgress />
        </div>
      );
    }

    return (
      <div className="content-quest">
        <div className="content-title text-black uppercase">
          {t("profile.your_quests")}
        </div>
        <Select className="category-select" defaultValue={t("all")} />
        {campaigns.map((campaign, index) => {
          const { id } = campaign;
          return (
            <QuestItem
              key={id}
              data={campaign}
              onClick={() => setCurrentCampaign(campaign)}
            />
          );
        })}
      </div>
    );
  }

  renderWallet() {
    return <Wallet />;
  }

  render() {
    return (
      <div className="profile-page hunter-profile">
        {this.renderBanner()}
        {this.renderContent()}
        <div />
      </div>
    );
  }
}

export default withTranslation()(
  withAuthContext(withProfileContext(withHunterDashboardContext(HunterProfile)))
);
