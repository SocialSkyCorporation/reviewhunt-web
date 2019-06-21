import React from "react";
import { Select } from "antd";
import imgMoney from "assets/images/money-circle.svg";
import imgHunter from "assets/images/hunter-circle.svg";
import QuestGridItem from "components/QuestGridItem";
import SimpleButton from "components/SimpleButton";
import { useTranslation, Trans } from "react-i18next";
import { CampaignConsumer } from "contexts/CampaignContext";
import ContentLoader from "components/ContentLoader";

export default () => {
  const { t } = useTranslation();

  const banner = () => {
    return (
      <div className="padded-container banner-content primary-gradient">
        <h1>{t("app_title")}</h1>
        <h2>
          <Trans i18nKey="home.banner">
            FUN QUESTS + BOUNTIES
            <br />
            MAKE COOL PRODUCTS FLY HIGH
          </Trans>
        </h2>
        <SimpleButton
          text={t("home.learn_more")}
          style={{
            marginTop: 20,
            marginBottom: 16
          }}
        />

        <div className="stat-container">
          <div className="stat-item">
            <img src={imgMoney} alt="" />
            <div className="stat-text">
              <h1>$149,000</h1>
              <h2>{t("home.total_bounty")}</h2>
            </div>
          </div>
          <div className="stat-item">
            <img src={imgHunter} alt="" />
            <div className="stat-text">
              <h1>1,054</h1>
              <h2>{t("home.total_hunters")}</h2>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const content = () => {
    return (
      <CampaignConsumer>
        {({ campaigns, fetchingCampaigns }) => {
          return (
            <div className="padded-container">
              <Select
                defaultValue={t("home.for_you")}
                style={{ marginBottom: 20 }}
              />

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
                <div className="empty-grid-item" />
              </div>
            </div>
          );
        }}
      </CampaignConsumer>
    );
  };

  const callToAction = () => {
    return <div className="call-to-action" />;
  };

  return (
    <div className="home-page">
      {banner()}
      {content()}
      {callToAction()}
    </div>
  );
};
