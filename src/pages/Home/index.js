import React, { Component } from 'react';
import { Select } from 'antd';
import imgMoney from 'assets/images/money-circle.svg';
import imgHunter from 'assets/images/hunter-circle.svg';
import QuestGridItem from 'components/QuestGridItem';
import SimpleButton from 'components/SimpleButton';

export default class index extends Component {
  renderBanner() {
    return (
      <div className="padded-container banner-content primary-gradient">
        <h1>REVIEWHUNT</h1>
        <h2>
          FUN QUESTS + BOUNTIES
          <br />
          MAKE COOL PRODUCTS FLY HIGH
        </h2>
        <SimpleButton
          text="LEARN MORE"
          style={{
            marginTop: 20,
            marginBottom: 16,
          }}
        />

        <div className="stat-container">
          <div className="stat-item">
            <img src={imgMoney} alt=""/>
            <div className="stat-text">
              <h1>$149,000</h1>
              <h2>Total Bounty Fund</h2>
            </div>
          </div>
          <div className="stat-item">
            <img src={imgHunter} alt=""/>
            <div className="stat-text">
              <h1>1,054</h1>
              <h2>Total Hunter on Quests</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderContent() {
    return (
      <div className="padded-container">
        <Select defaultValue={'For You'} style={{ marginBottom: 20 }} />
        <div className="grid-content">
          <QuestGridItem />
          <QuestGridItem />
          <QuestGridItem />
          <QuestGridItem />
          <QuestGridItem />
          <QuestGridItem />
          <QuestGridItem />
          <QuestGridItem />
          <div className="empty-grid-item"/>
        </div>
      </div>
    );
  }

  renderCallToAction() {
    return <div className="call-to-action" />;
  }

  render() {
    return (
      <div className="home-page">
        {this.renderBanner()}
        {this.renderContent()}
        {this.renderCallToAction()}
      </div>
    );
  }
}
