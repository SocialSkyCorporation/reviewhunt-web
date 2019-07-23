import React, { useEffect, useState, useContext } from "react";
import { Icon } from "antd";
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
import { scrollBottom, scrollTop } from "utils/scroller";
import CampaignContext from "contexts/CampaignContext";
import { questSortFunction } from "utils/helpers/campaignHelper";

export default props => {
  const [agreed, setAgreed] = useState(false);
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
      fetchCampaign(id, true);
    }

    scrollTop();
  }, []);

  const banner = () => {
    const {
      current_participant_count,
      product_type,
      product_name,
      quests,
      urls,
      joined
    } = currentCampaign;

    console.log(currentCampaign);

    return (
      <div className="padded-container banner-container primary-gradient">
        <div>
          <div className="product-category">{product_type.toUpperCase()}</div>
          <div className="product-name">{product_name}</div>
          <div className="line" />
          <div className="product-users">
            {t("product.hunters_on_quest")}: <b>{current_participant_count}</b>
            <br />
            Campaign will be closed in: <b>17 days</b>
          </div>
        </div>

        <div className="quest-progress-container col-on-mobile">
          {quests &&
            quests.sort(questSortFunction).map((item, index) => {
              const { bounty_max, quest_type } = item;
              const lastItem = index === quests.length - 1;
              return (
                <div className="quest-step col-on-mobile" key={index}>
                  <div className="row-align-center">
                    <div className="step-image-container">
                      <img className="quest-icon" src={questImg} alt="" />
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
            backgroundColor={joined ? "#000" : "transparent"}
            text={joined ? "JOINED" : t("product.join")}
            style={{ marginTop: 30 }}
            onClick={() => {
              if (!agreed) {
                scrollBottom();
                return;
              }
              joinCampaign(id);
            }}
            loading={joiningCampaign}
            color={joined ? "#fff" : "#000"}
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
        <div className="title uppercase">{t("product.information")}</div>
        <ScreenshotCarousel images={images} />
        <CollapsibleText minHeight={100} text={description} />

        <div className="section-divider" />
        <div className="title uppercase">{t("product.quests_reviews")}</div>

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

        <div className="title uppercase">{t("product.please_note")}</div>
        <div className="please-note margin-right-text">
          <div className="row-align-start">
            <span className="bullet-point">•</span>
            <div>
              Your proofs of quest, review, and buzz participation will be
              reviewed by our moderators, and your submission may be rejected if
              it fails to meet the guidelines that we’ve described in each
              quest, review, and buzz submission page. You won’t be able to
              receive your rewards when your submission is rejected.
            </div>
          </div>
          <div className="row-align-start">
            <span className="bullet-point">•</span>
            <div>
              Buzz rewards have a set range of rewards, and it will be varied
              based on our buzz quality measurement that considers your channel
              size, potential reach, actual performance, etc. Please note that
              we won’t be able to reward your buzz content when it doesn’t meet
              our minimum level of buzz quality measurement score.{" "}
            </div>
          </div>
          <div className="row-align-start">
            <span className="bullet-point">•</span>
            <div>
              Your HUNT tokens will be distributed within a week after this
              review campaign is finished. You can find your tokens via the
              wallet tab on your profile page.
            </div>
          </div>
          <div className="row-align-start">
            <span className="bullet-point">•</span>
            <div>
              Do not submit someone else’s content, fake your screenshot proof,
              or use the same proof via multiple alt accounts. We can
              permanently blacklist your account immediately and refuse/withdraw
              all your reward tokens when your actions are determined as an
              abusing attempt.
            </div>
          </div>
        </div>

        <div
          onClick={() => setAgreed(!agreed)}
          className="row-align-center agree-check"
        >
          <Icon
            type="check-circle"
            style={{
              fontSize: 34,
              borderRadius: 17,
              padding: 1,
              backgroundColor: agreed ? "#000" : "#fff",
              color: agreed ? "#fff" : "#8b9699",
              marginRight: 15
            }}
          />
          <div className="text-big text-grey">
            I have read and agree to the guidelines described above.
          </div>
        </div>

        <SimpleButton
          inverse
          style={{ marginTop: 16, maxWidth: 160 }}
          onClick={() => {
            if (!agreed) {
              scrollBottom();
              return;
            }
            joinCampaign(id);
          }}
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
