import React, { useEffect, useContext } from "react";
import { Select } from "antd";
import imgMoney from "assets/images/money-circle-black.svg";
import imgHunter from "assets/images/hunter-circle-black.svg";
import QuestGridItem from "components/QuestGridItem";
import SimpleButton from "components/SimpleButton";
import { useTranslation, Trans } from "react-i18next";
import CampaignContext from "contexts/CampaignContext";
import ContentLoader from "components/ContentLoader";
import logoCircle from "assets/images/logo-circle.svg";

export default () => {
  const { t } = useTranslation();
  const { campaigns, fetchCampaigns, fetchingCampaigns } = useContext(
    CampaignContext
  );

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const banner = () => {
    return (
      <div className="padded-container banner-content primary-gradient">
        <h1>{t("app_title")}</h1>
        <h2>
          <Trans i18nKey="home.banner">
            QUESTS TO MAKE
            <br />
            COOL PRODUCTS FLY HIGH
          </Trans>
        </h2>
        <SimpleButton
          text={t("home.learn_more")}
          style={{
            marginTop: 20,
            marginBottom: 16,
            maxWidth: 160
          }}
        />

        <div className="stat-container">
          <div className="stat-item">
            <div className="text-big text-black">{t("home.total_bounty")}</div>
            <div className="stat-item-text-container">
              <img src={imgMoney} alt="" />
              <div className="stat-text">
                <h1>
                  14,505,033 <span>HUNT</span>
                </h1>
                <h2>($14,554.35)</h2>
              </div>
            </div>
          </div>
          <div className="stat-item">
            <div className="text-big text-black">{t("home.total_hunters")}</div>
            <div className="stat-item-text-container">
              <img src={imgHunter} alt="" />
              <div className="stat-text">
                <h1>
                  1,054 <span>HUNTERS</span>
                </h1>
                <h2>(on 35 quests)</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const content = () => {
    return (
      <div className="padded-container">
        <Select defaultValue={t("home.for_you")} style={{ marginBottom: 20 }} />

        <div className="grid-content">
          {fetchingCampaigns && (
            <>
              <ContentLoader />
              <ContentLoader />
              <ContentLoader />
              <ContentLoader />
              <ContentLoader />
              <ContentLoader />
            </>
          )}
          {campaigns.map((campaign, index) => (
            <QuestGridItem key={index} data={campaign} />
          ))}
        </div>
      </div>
    );
  };

  const callToAction = () => {
    return (
      <div className="call-to-action primary-gradient">
        <div>
          <img className="logo-circle" src={logoCircle} />
          <div className="call-to-action-title text-black">
            Gate to tap into tech early-adopters
          </div>
          <div className="row-align-center button-container">
            <SimpleButton inverse text="Join Now" style={{ marginRight: 10 }} />
            <SimpleButton text="Read Pitch Deck" style={{ marginLeft: 10 }} />
          </div>
        </div>
        <div className="call-to-action-desc">
          Reviewhunt enables tech makers to run review campaigns for their new
          products with unique quests and mission bounties so that they can
          easily build a strong early user base and community exposure.
        </div>
      </div>
    );
  };

  return (
    <div className="home-page">
      {banner()}
      {content()}
      {callToAction()}
    </div>
  );
};
