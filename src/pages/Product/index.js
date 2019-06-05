import React, { Component } from 'react';
import ProgressBar from 'components/ProgressBar';
import SimpleButton from 'components/SimpleButton';
import ScreenshotCarousel from './ScreenshotCarousel';
import QuestCarousel from 'pages/Product/QuestCarousel';

import questImg from 'assets/images/quest-circle.svg';
import downArrowImg from 'assets/images/down-arrow-blue.svg';
import starImg from 'assets/images/star.svg';
import FullWidthButton from 'components/FullWidthButton';

export default class Product extends Component {
  renderBanner() {
    return (
      <div className="padded-container banner-container primary-gradient">
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
            const lastItem = index === 4;
            return (
              <div className="quest-step" key={index}>
                <div className="step-image-container">
                  <img src={questImg} />
                  {lastItem && <img className="quest-star" src={starImg} />}
                </div>
                <div className="quest-step-text">
                  <div className="price-text">$2</div>
                  <div className="quest-text">Quest {index + 1}</div>
                </div>
                {!lastItem && <div className="step-divider" />}
              </div>
            );
          })}
        </div>

        <SimpleButton text="JOIN THE QUEST" style={{ marginTop: 30 }} />
        <div />
      </div>
    );
  }

  renderProductInfo() {
    return (
      <div className="padded-container product-info">
        <div className="title">Product Information</div>
        <ScreenshotCarousel />
        <div className="section-divider" />
        <div className="desc">
          Bark transforms people nearby into fun barking dogs. Every user
          chooses one of the 8 different dog breeds and chats with other barkers
          by communicating like dogs. Simply bark at each other within a 1 mile
          radius by pressing the bark button. Communicate with other barkers via
          short and unique bark messages. Drop a post on your location like when
          a dog leaves a poo, and get unlimited attention.
        </div>

        <div className="show-more-container">
          <div className="show-more">Show More</div>
          <img className="down-arrow" src={downArrowImg} />
        </div>
        <div className="section-divider" />
        <div className="title">Quests and Reviews</div>

        <ProgressBar
          height={29}
          progress={30}
          containerStyle={{ marginTop: 21 }}
        />

        <div className="progress-bar-text">
          <div>61% remaining</div>
          <div>$10,500 bounty fund</div>
        </div>

        <QuestCarousel />

        <div className="section-divider" />

        <div className="title">Please Note</div>
        <div className="please-note">
          • Kogi Cosby sweater ethical squid irony disrupt, organic tote bag
          gluten-free XOXO wolf typewriter mixtape small batch. DIY pickled four
          loko McSweeney's, Odd Future dreamcatcher plaid. PBR&B single-origin
          coffee gluten-free McSweeney's banjo, bicycle rights food truck
          gastropub vinyl four loko umami +1 narwhal chia. Fashion axe Banksy
          chia umami artisan, bitters 90's fanny pack. Single-origi.
          <br />
          <br />
          • Kogi Cosby sweater ethical squid irony disrupt, organic tote bag
          gluten-free XOXO wolf typewriter mixtape small batch. DIY pickled four
          loko McSweeney's, Odd Future dreamcatcher plaid. PBR&B single-origin
          coffee gluten-free McSweeney's banjo, bicycle rights food truck
          gastropub vinyl four loko umami +1 narwhal chia. Fashion axe Banksy
          chia umami artisan, bitters 90's fanny pack. Single-origi.
          <br />
          <br />• Kogi Cosby sweater ethical squid irony disrupt, organic tote
          bag gluten-free XOXO wolf typewriter mixtape small batch. DIY pickled
          four loko McSweeney's, Odd Future dreamcatcher plaid. PBR&B
          single-origin coffee gluten-free McSweeney's banjo, bicycle rights
          food truck gastropub vinyl four loko umami +1 narwhal chia. Fashion
          axe Banksy chia umami artisan, bitters 90's fanny pack. Single-origi.
        </div>


        <FullWidthButton style={{ marginTop: 16 }} text="JOIN THE QUEST" />
      </div>
    );
  }

  render() {
    return (
      <div className="product-page">
        {this.renderBanner()}
        {this.renderProductInfo()}
      </div>
    );
  }
}
