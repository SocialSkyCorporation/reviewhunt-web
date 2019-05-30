import React, { Component } from "react";
import imgMoney from "assets/images/money-circle.svg"
import imgHunter from "assets/images/hunter-circle.svg";
import QuestGridItem from "components/QuestGridItem";

export default class index extends Component {
  renderBanner() {
    return (
      <div className="banner-content primary-gradient">
        <h1>REVIEWHUNT</h1>
        <h2>
          FUN QUESTS + BOUNTIES
          <br />
          MAKE COOL PRODUCTS FLY HIGH
        </h2>
        <div className="learn-more">
          <p>LEARN MORE</p>
        </div>

        <div className="stat-container">
          <div className="stat-item">
            <img src={imgMoney} />
            <div className="stat-text">
              <h1>$149,000</h1>
              <h2>Total Bounty Fund</h2>
            </div>
          </div>
          <div className="stat-item">
            <img src={imgHunter} />
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
      <div className="grid-content">
        <QuestGridItem />
        <QuestGridItem />
        <QuestGridItem />
        <QuestGridItem />
      </div>
    );
  }

  renderCallToAction() {
    return (
      <div className="call-to-action">
      </div>
    )


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
