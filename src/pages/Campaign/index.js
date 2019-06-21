import React, { useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import _ from "lodash";

import ProgressBar from "components/ProgressBar";
import SimpleButton from "components/SimpleButton";
import ScreenshotCarousel from "./ScreenshotCarousel";
import QuestCarousel from "./QuestCarousel";

import questImg from "assets/images/quest-circle.svg";
import downArrowImg from "assets/images/down-arrow-blue.svg";
import starImg from "assets/images/star.svg";
import FullWidthButton from "components/FullWidthButton";
import CircularProgress from "components/CircularProgress";
import { scrollTop } from "utils/scroller";
import CampaignContext, { CampaignConsumer } from "contexts/CampaignContext";

export default props => {
  const { t } = useTranslation();
  const {
    match: {
      params: { id }
    }
  } = props;
  const ctx = useContext(CampaignContext);
  console.log(ctx);

  useEffect(() => {
    const fetchData = async () => {};

    if (_.isEmpty({})) {
      //fetch
      fetchData();
    }

    scrollTop();
  }, []);

  const banner = () => {
    return (
      <div className="padded-container banner-container primary-gradient">
        <div>
          <div className="product-category">APP</div>
          <div className="product-name">BARK</div>
          <div className="line" />
          <div className="product-users">
            {t("product.hunters_on_quest")}: <span>57</span>
            <br />
            {t("product.total_bounty")}: <span>$115</span>
          </div>
        </div>

        <div className="quest-progress-container col-on-mobile">
          {new Array(5).fill(undefined).map((item, index) => {
            const lastItem = index === 4;
            return (
              <div className="quest-step col-on-mobile" key={index}>
                <div className="row-align-center">
                  <div className="step-image-container">
                    <img src={questImg} alt="" />
                  </div>
                  <div className="quest-step-text">
                    {lastItem && (
                      <img className="quest-star" src={starImg} alt="" />
                    )}
                    <div className="price-text">$200</div>
                    <div className="quest-text">
                      {t("product.quest")} {index + 1}
                    </div>
                  </div>
                </div>
                {!lastItem && <div className="step-divider" />}
              </div>
            );
          })}
        </div>

        <div>
          <SimpleButton text={t("product.join")} style={{ marginTop: 30 }} />
        </div>
      </div>
    );
  };

  const productInfo = () => {
    return (
      <div className="padded-container product-info">
        <div className="title">{t("product.information")}</div>
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
          <div className="show-more">{t("product.show_more")}</div>
          <img className="down-arrow" src={downArrowImg} alt="" />
        </div>
        <div className="section-divider" />
        <div className="title">{t("product.quests_reviews")}</div>

        <ProgressBar
          height={29}
          progress={30}
          containerStyle={{ marginTop: 21 }}
        />

        <div className="progress-bar-text">
          <div>61% {t("product.remaining")}</div>
          <div>$10,500 {t("product.bounty_fund")}</div>
        </div>

        <QuestCarousel />

        <div className="section-divider" />

        <div className="title">{t("product.please_note")}</div>
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

        <FullWidthButton style={{ marginTop: 16 }} text={t("product.join")} />
      </div>
    );
  };

  return (
    <CampaignConsumer>
      {({fetchingCampaign}) => {
        return (
          <div className="product-page">
            {banner()}
            {fetchingCampaign ? <CircularProgress/> : productInfo()}
          </div>
        );
      }}
    </CampaignConsumer>
  );
};
