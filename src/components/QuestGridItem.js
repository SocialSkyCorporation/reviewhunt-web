import React, { useContext } from "react";
import { Link } from "react-router-dom";
import moneySvg from "assets/images/money-single.svg";
import hunterSvg from "assets/images/hunter-single.svg";
import questSvg from "assets/images/quest-single.svg";
import ProgressBar from "components/ProgressBar";
import CampaignContext from "contexts/CampaignContext";
import { numberWithCommas } from "utils/helpers/numberFormatHelper";

const QuestGridItem = props => {
  const { setCurrentCampaign } = useContext(CampaignContext);

  const { data } = props;
  const {
    id,
    thumbnails,
    quest_count,
    product_name,
    product_type,
    short_description,
    current_participant_count,
    total_bounty,
    bounty_left
  } = data;
  console.log(data);

  let percentLeft =
    total_bounty > 0
      ? Math.max(
          0,
          (Number.parseFloat(bounty_left) / Number.parseFloat(total_bounty)) *
            100
        )
      : 0;

  return (
    <Link
      onClick={e => {
        setCurrentCampaign(data);
      }}
      to={`/campaigns/${id}`}
      className="quest-grid-item"
    >
      <div>
        <div className="quest-badge">
          <p>{percentLeft}% Reward Left</p>
        </div>

        <div className="top-container">
          <img className="thumbnail" src={thumbnails && thumbnails["x2"]} alt="" />
        </div>

        <ProgressBar height={10} progress={20} dark />

        <div className="bottom-container">
          <div className="text-container">
            <div className="row-align-center">
              <h1 className="title">{product_name}</h1>
              <div
                className={`category-badge ${product_type
                  .replace(" ", "")
                  .toLowerCase()}`}
              >
                {product_type}
              </div>
            </div>
            <p className="description two-lines">{short_description}</p>
          </div>

          <div className="row-space-between">
            <div className="row-align-center">
              <img className="grid-item-icon" src={moneySvg} alt="" />
              <div className="bounty-text-container">
                <div className="subheader text-black">
                  {numberWithCommas(Number.parseInt(total_bounty))}{" "}
                  <span>HUNT</span>
                </div>
                <div className="subtext text-grey">Total Bounty Fund</div>
              </div>
            </div>

            <div className="vertical-divider" />

            <div className="row-align-center">
              <img className="grid-item-icon" src={hunterSvg} alt="" />
              <div className="bounty-text-container">
                <div className="subheader text-black">
                  {current_participant_count}
                </div>
                <div className="subtext text-grey">Hunters on Quest</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default QuestGridItem;
