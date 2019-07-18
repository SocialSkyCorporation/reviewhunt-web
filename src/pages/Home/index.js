import React, { useEffect, useContext } from "react";
import { Select } from "antd";
import { Link } from "react-router-dom";
import imgMoney from "assets/images/money-circle-black.svg";
import imgHunter from "assets/images/hunter-circle-black.svg";
import QuestGridItem from "components/QuestGridItem";
import SimpleButton from "components/SimpleButton";
import { useTranslation, Trans } from "react-i18next";
import CampaignContext from "contexts/CampaignContext";
import AppContext from "contexts/AppContext";
import ContentLoader from "components/ContentLoader";
import logoCircle from "assets/images/logo-circle.svg";
import { numberWithCommas } from 'utils/helpers/numberFormatHelper';

export default () => {
  const { t } = useTranslation();
  const { campaigns, fetchCampaigns, fetchingCampaigns } = useContext(
    CampaignContext
  );
  const {huntPerUsd} = useContext(
    AppContext
  );

  let totalHunters = 0;
  let totalBountyFund = 0;
  let totalQuests = 0;


  campaigns.forEach((campaign) => {
    const {quest_count, total_bounty, current_participant_count} = campaign;
    totalQuests += quest_count;
    totalBountyFund += parseFloat(total_bounty);
    totalHunters += current_participant_count;
  })

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const banner = () => {
    return (
      <div className="padded-container banner-content primary-gradient">
        <div className="big-screen-content">
          <h1>{t("app_title")}</h1>
          <h2>
            <Trans i18nKey="home.banner">
              QUESTS TO MAKE
              <br />
              COOL PRODUCTS FLY HIGH
            </Trans>
          </h2>
          <Link to="/about">
            <SimpleButton
              text={t("home.learn_more")}
              backgroundColor="transparent"
              style={{
                marginTop: 20,
                marginBottom: 16,
                maxWidth: 160
              }}
            />
          </Link>

          <div className="stat-container">
            <div className="stat-item">
              <div className="text-big text-black">
                {t("home.total_bounty")}
              </div>
              <div className="stat-item-text-container">
                <img src={imgMoney} alt="" />
                <div className="stat-text">
                  <h1>
                    {numberWithCommas((totalBountyFund / huntPerUsd).toFixed(0))} <span>HUNT</span>
                  </h1>
                  <h2>(${numberWithCommas(totalBountyFund)})</h2>
                </div>
              </div>
            </div>
            <div className="stat-item">
              <div className="text-big text-black">
                {t("home.total_hunters")}
              </div>
              <div className="stat-item-text-container">
                <img src={imgHunter} alt="" />
                <div className="stat-text">
                  <h1>
                    {numberWithCommas(totalHunters)} <span>HUNTERS</span>
                  </h1>
                  <h2>(on {numberWithCommas(totalQuests)} quests)</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const content = () => {
    return (
      <div className="grid-wrapper">
        <Select className="grid-dropdown" defaultValue={t("home.for_you")} />
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

          {/*placeholder for flex-wrap, align center*/}
          <div className="empty-grid-item" />
          <div className="empty-grid-item" />
        </div>
      </div>
    );
  };

  const callToAction = () => {
    return (
      <div className="padded-container call-to-action primary-gradient col-on-tablet">
        <div>
          <img className="logo-circle" src={logoCircle} />
          <div className="call-to-action-title text-black">
            Gate to tap into tech early-adopters
          </div>
          <div className="row-align-center button-container">
            <SimpleButton inverse text="Join Now" style={{ marginRight: 10 }} />
            <SimpleButton text="Read Pitch Deck" style={{ marginLeft: 10 }} backgroundColor="transparent" />
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
