import React, { Component } from "react";
import questImg from "assets/images/quest-circle.svg";

export default class Product extends Component {
  renderBanner() {
    return (
      <div className="banner-container">
        <div className="product-category">APP</div>
        <div className="product-name">BARK</div>
        <div className="line" />
        <div className="product-users">
          Hunters on the quest now: <span>57</span>
          <br />
          Total bounty to win for you: <span>$115</span>
        </div>

        <div className="quest-step-container">
          {new Array(5).fill(undefined).map((item, index) => {
            return (
              <div className="quest-step">
                <img src={questImg} />
                <div className="quest-step-text">
                  <div className="price-text">$2</div>
                  <div className="quest-text">Quest {index + 1}</div>
                </div>
                {index !== 4 && <div className="step-divider" />}
              </div>
            );
          })}
        </div>

        <div className="join-button">JOIN THE QUEST</div>

        <div />
      </div>
    );
  }

  renderProductInfo() {
    return (
      <div className="product-info">
      <div className="product-info-title">Product Information</div>

      </div>
    )
  }

  render() {
    return (
      <div className="product-page">
        {this.renderBanner()}
        {this.renderProductInfo()}
        <div />
      </div>
    );
  }
}
