import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import macImgTop from "assets/images/mac-img-top@2x.png";
import featureImg1 from "assets/images/feature-1@2x.png";
import featureImg2 from "assets/images/feature-2@2x.png";
import featureImg3 from "assets/images/feature-3@2x.png";
import { scrollTop } from "utils/scroller";
import SimpleButton from "components/SimpleButton";
import hunterCircleImg from "assets/images/hunter-circle.svg";
import questCircleImg from "assets/images/quest-circle.svg";
import speakCircleImg from "assets/images/speak-circle.svg";

export default () => {
  return (
    <div id="about-page" className="about-page">
      <div className="padded-container about-gradient banner">
        <div className="reviewhunt">REVIEWHUNT</div>
        <div className="banner-title">Fun Quests. Early Users.</div>
        <img className="laptop-screenshot" src={macImgTop} alt="" />
      </div>

      <div className="into-tech-container padded-container">
        <div className="tech-title text-grey">Tap into tech</div>
        <div className="tech-title text-black">early-adopters</div>

        <div className="text-small text-grey tech-description">
          Reviewhunt enables tech makers to run review campaigns for their new
          products with unique quests and mission bounties so that they can
          easily build a strong early user base and community exposure.
        </div>
        <div className="row-align-center button-container">
          <Link to="/profile">
            <SimpleButton
              inverse={true}
              text="Join Now"
              style={{ fontSize: 12, marginRight: 10 }}
            />
          </Link>
          <a
            target="__blank"
            href="https://review.hunt.town/reviewhunt-pitch-en-v1.1.pdf"
          >
            <SimpleButton
              text="Read Pitch Deck"
              style={{ fontSize: 12, marginLeft: 10 }}
            />
          </a>
        </div>
      </div>

      <div className="primary-gradient fly-high-container padded-container">
        <div className="fly-high-subheader text-black">
          Review campaign that
          <br />
          makes cool products
        </div>
        <div />
        <div className="fly-high-title text-black">fly high</div>
        <div className="icon-text-items">
          <div className="icon-text-item row-align-center text-black">
            <img src={hunterCircleImg} />
            <div className="description">
              Fun quests that are connected with your core features
            </div>
          </div>
          <div className="icon-text-item row-align-center text-black">
            <img src={questCircleImg} />
            <div className="description">
              +22,000 tech early-adopters become your seed users
            </div>
          </div>
          <div className="icon-text-item row-align-center text-black">
            <img src={speakCircleImg} />
            <div className="description">
              The quest participants create quality reviews via various channels
            </div>
          </div>
        </div>
      </div>

      <div className="screenshot-info-container">
        <div className="screenshot-item">
          <div className="row-space-between col-on-mobile">
            <div className="screenshot-item-title text-black">
              Fun quests. Get early users instantly.
            </div>
            <div className="screenshot-item-description text-grey">
              Reviewhunt enables tech makers to run review campaigns for their
              new products with unique quests and mission bounties so that they
              can easily build a strong early user base and community exposure.
            </div>
          </div>
          <img className="laptop-screenshot" src={featureImg1} alt="" />
        </div>
        <div className="screenshot-item">
          <div className="row-space-between col-on-mobile">
            <div className="screenshot-item-title text-black">
              +22,000 tech influencers are ready to try.
            </div>
            <div className="screenshot-item-description text-grey">
              Reviewhunt is built on top of Steemhunt - the biggest tech
              community in blockchain. Our hunters love to dig out new products
              and talk about them with others. Over 70,000 new products are
              shared within the Steemhunt community, and they will be their
              early users in Reviewhunt.
              <a target="__blank" href="https://token.hunt.town">
                <SimpleButton
                  text="About Steemhunt"
                  style={{ marginTop: 20, maxWidth: 180 }}
                />
              </a>
            </div>
          </div>
          <img className="laptop-screenshot" src={featureImg2} alt="" />
        </div>
        <div className="screenshot-item">
          <div className="row-space-between col-on-mobile">
            <div className="screenshot-item-title text-black">
              Impactful Buzz content spreading out.
            </div>
            <div className="screenshot-item-description text-grey">
              Hunters who have participated in the quests create impactful
              review content and spread to a variety of tech channels such as
              Reddit, Youtube, and Twitter that they are heavily involved with.
              Our blockchain-powered token economy enables makers to utilise
              their influential power, which creates real buzz.
            </div>
          </div>
          <img className="laptop-screenshot" src={featureImg3} alt="" />
        </div>
      </div>

      <div className="easy-build-container">
        <div>
          <div className="easy-build-sentence-1">
            It’s never been easier to build
          </div>
          <div className="easy-build-sentence-2">
            early-user base, App Store reviews, Reddit threads, Tweets, Youtube
            videos, blog posts, local channel contents, <br />…
          </div>

          <div className="easy-build-sentence-3">
            Ready to run your campaign?
          </div>
          <div className="row-align-center button-container">
            <Link to="/profile">
              <SimpleButton
                text="Join Now"
                style={{ marginRight: 10 }}
                borderColor={"#73fdea"}
                backgroundColor={"#000"}
                hoverColor={"#73fdea"}
                hoverTextColor={"#000"}
                color={"#73fdea"}
              />
            </Link>
            <a
              target="__blank"
              href="https://review.hunt.town/reviewhunt-pitch-en-v1.1.pdf"
            >
              <SimpleButton
                text="Read Pitch Deck"
                style={{ marginLeft: 10 }}
                borderColor={"#8b9699"}
                backgroundColor={"#000"}
                hoverColor={"#8b9699"}
                color={"#8b9699"}
                hoverTextColor={"#000"}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
