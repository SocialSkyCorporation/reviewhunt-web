import React, { useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";

import ProgressBar from "components/ProgressBar";
import SimpleButton from "components/SimpleButton";
import ScreenshotCarousel from "./ScreenshotCarousel";
import QuestCarousel from "./QuestCarousel";
import CollapsibleText from "./CollapsibleText";

import questImg from "assets/images/quest-circle.svg";
import starImg from "assets/images/star.svg";
import appStoreImg from "assets/images/appstore.svg";
import playStoreImg from "assets/images/playstore.svg";
import websiteImg from "assets/images/website.svg";

import FullWidthButton from "components/FullWidthButton";
import CircularProgress from "components/CircularProgress";
import { scrollTop } from "utils/scroller";
import CampaignContext from "contexts/CampaignContext";

export default props => {
  const { t } = useTranslation();
  const {
    match: {
      params: { id }
    }
  } = props;
  const ctx = useContext(CampaignContext);

  const {
    currentCampaign,
    fetchCampaign,
    fetchingCampaign,
    joinCampaign,
    joiningCampaign
  } = ctx;

  useEffect(() => {
    if (!fetchingCampaign) {
      fetchCampaign(id);
    }

    scrollTop();
  }, []);

  const banner = () => {
    const {
      current_participant_count,
      product_name,
      quests,
      urls,
      joined
    } = currentCampaign;

    return (
      <div className="padded-container banner-container primary-gradient">
        <div>
          <div className="product-category">APP</div>
          <div className="product-name">{product_name}</div>
          <div className="line" />
          <div className="product-users">
            {t("product.hunters_on_quest")}:{" "}
            <b>{current_participant_count}</b>
            <br />
            {t("product.total_bounty")}: <b>${0}</b>
          </div>
        </div>

        <div className="quest-progress-container col-on-mobile">
          {quests &&
            quests.map((item, index) => {
              const { bounty_max, quest_type } = item;
              const lastItem = index === quests.length - 1;
              return (
                <div className="quest-step col-on-mobile" key={index}>
                  <div className="row-align-center">
                    <div className="step-image-container">
                      <img src={questImg} alt="" />
                    </div>
                    <div className="quest-step-text">
                      {quest_type === "buzz" && (
                        <img className="quest-star" src={starImg} alt="" />
                      )}
                      <div className="price-text">${bounty_max}</div>
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

        <div className="row-align-center">
          <SimpleButton
            text={joined ? "JOINED" : t("product.join")}
            style={{ marginTop: 30 }}
            onClick={() => joinCampaign(id)}
            loading={joiningCampaign}
            inverse={joined}
          />
          <div className="row-align-center url-icon-container">
            {urls["appstore"] && (
              <a href={urls["appstore"]}>
                <img className="url-icon hover-link" src={appStoreImg} alt="" />
              </a>
            )}
            {urls["playstore"] && (
              <a href={urls["playstore"]}>
                <img
                  className="url-icon hover-link"
                  src={playStoreImg}
                  alt=""
                />
              </a>
            )}
            {urls["website"] && (
              <a href={urls["website"]}>
                <img className="url-icon hover-link" src={websiteImg} alt="" />
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

  const productInfo = () => {
    const {
      description,
      images,
      quests,
      total_bounty,
      bounty_left,
      joined
    } = currentCampaign;
    let progress =
      (Number.parseFloat(bounty_left) / Number.parseFloat(total_bounty)) * 100;
    progress = !Number.isNaN(progress) ? progress : 0;

    return (
      <div className="padded-container product-info">
        <div className="title">{t("product.information")}</div>
        <ScreenshotCarousel images={images} />
        <div className="section-divider" />
        <CollapsibleText minHeight={100} text={description} />

        <div className="section-divider" />
        <div className="title">{t("product.quests_reviews")}</div>

        <ProgressBar
          height={29}
          progress={progress}
          containerStyle={{ marginTop: 21 }}
        />

        <div className="progress-bar-text">
          <div>
            {progress}% {t("product.remaining")}
          </div>
          <div>
            ${total_bounty} {t("product.bounty_fund")}
          </div>
        </div>

        <QuestCarousel quests={quests} />

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

        <FullWidthButton
          style={{ marginTop: 16 }}
          onClick={() => joinCampaign(id)}
          text={joined ? "JOINED" : t("product.join")}
        />
      </div>
    );
  };

  return (
    <div className="campaign-page">
      {!currentCampaign || fetchingCampaign ? (
        <CircularProgress />
      ) : (
        <>
          {banner()}
          {productInfo()}
        </>
      )}
    </div>
  );
};
