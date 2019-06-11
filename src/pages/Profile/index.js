import React, { Component } from "react";
import { Icon, Input, Select } from "antd";
import moneyImg from "assets/images/money-circle.svg";
import crownImg from "assets/images/crown-circle.svg";
import TabItem from "./TabItem";
import ProfileRow, {
  TYPE_DROPDOWN,
  TYPE_SOCIAL,
  TYPE_PASSWORD
} from "./ProfileRow";
import QuestItem from "./QuestItem";
import CurrentQuest from "./CurrentQuest";
import ProgressBar from "components/ProgressBar";
import SimpleButton from "components/SimpleButton";
import { AuthConsumer } from "contexts/AuthContext";
import steemLogoWhite from "assets/images/steem-logo.svg";
import steemLogoBlack from "assets/images/steem-logo-bk.svg";
import { getLoginURL } from "utils/token";
import { withTranslation } from "react-i18next";

const TAB_PROFILE = 0;
const TAB_QUEST = 1;
const TAB_WALLET = 2;

const { Option } = Select;

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
      <div className="padded-container primary-gradient banner-container">
        <div className="banner-header">
          {t("profile.my_account").toUpperCase()}
        </div>
        <div className="banner-subheader">YOUNGHWI CHO</div>
        <div className="banner-line" />

        <div className="summary-container">
          <div className="summary-item">
            <img className="icon" src={crownImg} alt="" />
            <div className="text-container">
              <div className="title">{t("profile.top")} 3.5%</div>
              <div className="subtitle">{t("profile.buzz_performance")}</div>
            </div>
          </div>
          <div className="summary-item">
            <img className="icon" src={moneyImg} alt="" />
            <div className="text-container">
              <div className="title">$5,055</div>
              <div className="subtitle">{t("profile.earned_bounty")}</div>
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
    const { tabIndex } = this.state;
    const { t } = this.props;
    return (
      <div className="tabs">
        <TabItem
          text={t("profile_tab")}
          selected={tabIndex === 0}
          onClick={() => this.setState({ tabIndex: 0 })}
        />
        <TabItem
          text={t("profile.quest_dashboard")}
          selected={tabIndex === 1}
          onClick={() => this.setState({ tabIndex: 1 })}
        />
        <TabItem
          text={t("profile.wallet")}
          selected={tabIndex === 2}
          onClick={() => this.setState({ tabIndex: 2 })}
        />
      </div>
    );
  }

  renderTabContent() {
    const { tabIndex } = this.state;

    return (
      <div className="tab-content">
        {tabIndex === TAB_PROFILE && this.renderProfileTab()}
        {tabIndex === TAB_QUEST && this.renderQuestTab()}
      </div>
    );
  }

  renderProfileTab() {
    const { editProfile, socialChannels, steemLogo } = this.state;
    const { t } = this.props;

    return (
      <AuthConsumer>
        {({ me, steemconnectLoading }) => {
          return (
            <div>
              <div className="steem-connect">
                {true ? (
                  <div className="row-align-center row-space-between col-on-mobile steem-connected-container">
                    <div>
                      <div className="text-black">{t("steem_steemhunt")}</div>
                      <div className="profile-icon-container row-align-center">
                        <img
                          className="profile-icon"
                          src="https://picsum.photos/34"
                          alt=""
                        />
                        <div className="profile-icon-text text-black">
                          @project7
                        </div>
                      </div>
                    </div>
                    <div>
                      <SimpleButton
                        className="steem-connect-button"
                        text={t("disconnect").toUpperCase()}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="row-align-center row-space-between col-on-mobile">
                      <div>
                        <div className="text-black">
                          STEEMHUNT (STEEM) ACCOUNT
                        </div>
                        <div className="profile-icon-container profile-icon-text text-grey">
                          Connect your Reviewhunt account to your Steemhunt
                          (Steem) account for syncing the HUNT transactions.
                        </div>
                      </div>
                      <div>
                        <a href={getLoginURL()}>
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
                  {t('basic_information').toUpperCase()}
                </div>
                <ProfileRow
                  title={t('name')}
                  value="Younghwi Cho"
                  editMode={editProfile}
                />
                <ProfileRow
                  title={t('email')}
                  value="abc@mail.com"
                  editMode={editProfile}
                />
                <ProfileRow
                  title={t('country')}
                  value="Korea, Republic of"
                  editMode={editProfile}
                  type={TYPE_DROPDOWN}
                />
                <ProfileRow
                  title={t('password')}
                  value="password"
                  editMode={editProfile}
                  type={TYPE_PASSWORD}
                  password={true}
                />

                <div className="row-align-center social-title-container">
                  <div className="content-title text-black social">
                    {t('your_channels').toUpperCase()}
                  </div>
                </div>

                {socialChannels.length === 0 && !editProfile && (
                  <div className="social-connect-tip">
                  {t('profile.social_tip')}
                  </div>
                )}

                {editProfile && (
                  <div className="row-align-center col-on-mobile">
                    <Select
                      defaultValue={t('profile.add_channels')}
                      className="value-container select channel-select gray-bg-select text-grey"
                      onChange={e =>
                        this.setState({
                          socialChannels: socialChannels.concat({
                            channel: e,
                            value: `https://${e}.com/`
                          })
                        })
                      }
                    >
                      <Option value="instagram">Instagram</Option>
                      <Option value="twitter">Twitter</Option>
                      <Option value="youtube">YouTube</Option>
                      <Option value="blog">Blog</Option>
                    </Select>

                    <Input
                      placeholder={t('input_url')}
                      className="value-container text-grey"
                      onChange={e => {}}
                    />
                  </div>
                )}

                {true && (
                  <>
                    {socialChannels.map((item, index) => {
                      return (
                        <ProfileRow
                          key={index}
                          title={item.channel}
                          value={item.value}
                          editMode={editProfile}
                          type={TYPE_SOCIAL}
                          onDeletePressed={() => {
                            socialChannels.splice(index, 1);
                            this.setState({ socialChannels });
                          }}
                        />
                      );
                    })}
                  </>
                )}

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
                      {t('cancel').toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        }}
      </AuthConsumer>
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
        <div className="content-title text-black">{t('your_quests').toUpperCase()}</div>
        <Select className="category-select" defaultValue={t('all')} />
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
        <div />
      </div>
    );
  }
}

export default withTranslation()(Profile);
