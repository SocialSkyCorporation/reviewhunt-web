import React, { Component } from 'react';
import { Select } from 'antd';
import moneyImg from 'assets/images/money-circle.svg';
import crownImg from 'assets/images/crown-circle.svg';
import TabItem from './TabItem';
import ProfileRow, {
  TYPE_DROPDOWN,
  TYPE_SOCIAL,
  TYPE_PASSWORD
} from './ProfileRow';
import QuestItem from './QuestItem';
import CurrentQuest from './CurrentQuest';
import ProgressBar from 'components/ProgressBar';

const TAB_PROFILE = 0;
const TAB_QUEST = 1;
const TAB_WALLET = 2;

export default class Profile extends Component {
  state = {
    tabIndex: 0,
    editProfile: false,
    socialChannels: [],
    currentQuest: null
  };

  renderBanner() {
    return (
      <div className="padded-container primary-gradient banner-container">
        <div className="banner-header">MY ACCOUNT</div>
        <div className="banner-subheader">YOUNGHWI CHO</div>
        <div className="banner-line" />

        <div className="summary-container">
          <div className="summary-item">
            <img className="icon" src={crownImg} alt="" />
            <div className="text-container">
              <div className="title">TOP 3.5%</div>
              <div className="subtitle">Your buzz performance</div>
            </div>
          </div>
          <div className="summary-item">
            <img className="icon" src={moneyImg} alt="" />
            <div className="text-container">
              <div className="title">$5,055</div>
              <div className="subtitle">Total bounty rewards so far</div>
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
    return (
      <div className="tabs">
        <TabItem
          text="Profile"
          selected={tabIndex === 0}
          onClick={() => this.setState({ tabIndex: 0 })}
        />
        <TabItem
          text="Quest Dashboard"
          selected={tabIndex === 1}
          onClick={() => this.setState({ tabIndex: 1 })}
        />
        <TabItem
          text="Wallet"
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
    const { editProfile, socialChannels } = this.state;

    return (
      <div className="content-profile">
        <div className="content-title">BASIC INFORMATION</div>
        <ProfileRow title="Name" value="Younghwi Cho" editMode={editProfile} />
        <ProfileRow
          title="Email Address"
          value="abc@mail.com"
          editMode={editProfile}
        />
        <ProfileRow
          title="Country of Residence"
          value="Korea, Republic of"
          editMode={editProfile}
          type={TYPE_DROPDOWN}
        />
        <ProfileRow
          title="Password"
          value="password"
          editMode={editProfile}
          type={TYPE_PASSWORD}
          password={true}
        />

        <div className="content-title">YOUR SOCIAL CHANNELS</div>

        {socialChannels.length === 0 && !editProfile && (
          <div className="social-connect-tip">
            Connect your social and community channels and get more buzz bounty
            opportunities.
          </div>
        )}

        {true && (
          <>
            <ProfileRow
              title="Instagram"
              value="https://www.instagram.com/andrew___cho/"
              editMode={editProfile}
              type={TYPE_SOCIAL}
            />
            <ProfileRow
              title="Twitter"
              value="https://twitter.com/cyh76507707"
              editMode={editProfile}
              type={TYPE_SOCIAL}
            />
            <ProfileRow
              title="Youtube"
              value="https://www.youtube.com/channel/UCl_6lrasdfassdfasdfasdawoiejfioawjefoiwjiof"
              editMode={editProfile}
              type={TYPE_SOCIAL}
            />
            <ProfileRow
              title="Blog"
              value="https://steemit.com/@project7"
              editMode={editProfile}
              type={TYPE_SOCIAL}
            />
          </>
        )}

        <div className="button-container">
          <div
            className="edit-button"
            onClick={() => this.setState({ editProfile: true })}
          >
            {editProfile ? 'SUBMIT' : 'EDIT PROFILE'}
          </div>
          {editProfile && (
            <div
              className="cancel-button"
              onClick={() => this.setState({ editProfile: false })}
            >
              CANCEL
            </div>
          )}
        </div>
      </div>
    );
  }

  renderQuestTab() {
    const { currentQuest } = this.state;

    if (currentQuest) {
      return (
        <>
          <ProgressBar height={8} progress={30} />
          <div className="content-quest">
            <CurrentQuest onBackPressed={() => this.setState({currentQuest: null})} />
          </div>
        </>
      );
    }

    return (
      <div className="content-quest">
        <div className="content-title">YOUR QUESTS</div>
        <Select defaultValue={'All'} style={{ width: 100 }} />
        <QuestItem
          steps={[1, 2, 3, 'review', 'buzz']}
          currentStep={1}
          onClick={() => this.setState({ currentQuest: 1 })}
        />
        <QuestItem
          steps={[1, 2, 3, 'review', 'buzz']}
          currentStep={3}
          onClick={() => this.setState({ currentQuest: 1 })}
        />
        <QuestItem steps={[1, 2, 3, 'review', 'buzz']} currentStep={3} />
        <QuestItem steps={[1, 2, 'review', 'buzz']} currentStep={5} />
        <QuestItem steps={[1, 2, 'review', 'buzz']} currentStep={3} ended />
        <QuestItem steps={[1, 2, 'review', 'buzz']} currentStep={4} ended />
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
