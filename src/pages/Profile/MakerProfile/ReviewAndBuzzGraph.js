import React from "react";
import PropTypes from "prop-types";
import {Icon} from 'antd';
import appstoreImg from "assets/images/appstore.svg";
import playstoreImg from "assets/images/playstore.svg";
import youtubeIcon from "assets/images/youtube.svg";
import instagramIcon from "assets/images/instagram.svg";
import twitterIcon from "assets/images/twitter.svg";
import steemitIcon from "assets/images/steemit.svg";
import redditIcon from "assets/images/reddit.svg";
import twitchIcon from "assets/images/twitch.svg";
import othersIcon from "assets/images/other.svg";

const IconValue = ({icon, title, value}) => {
  return (
    <div className="row-align-center review-icon-item">
      <div className="review-buzz-icon">
      <img src={icon} alt="" />
      </div>
      <div>
        <div className="text-grey">{title}</div>
        <div className="text-black text-big">{value}</div>
      </div>
      <Icon className="review-right-icon" type="right"/>
    </div>
  );
};

const GraphItem = ({ icon, title, value }) => {
  return (
    <div className="row-align-center col-on-mobile graph-item">
      <div className="row-align-center">
        <img src={icon} alt="" />
        <div className="text-grey graph-title">{title}</div>
      </div>
      <div className="row-align-center graph-bar-container">
        <div className="graph-bar" style={{ width: `${value}%` }} />
        <div className="text-small text-grey">{value}</div>
      </div>
    </div>
  );
};

const ReviewAndBuzzGraph = ({}) => {
  return (
    <div className="review-buzz-graph">
      <div className="text-black text-small">
        <b>172</b> new app store reviews were generated.
        <div className="row-align-center review-stat-icons">
          <IconValue icon={appstoreImg} title={"App Store"} value={96}/>
          <IconValue icon={playstoreImg} title={"Play Store"} value={74}/>
        </div>
        <b>239</b> new buzz contents are spread.
        <div className="graph-items-container">
          <GraphItem icon={youtubeIcon} title={"YouTube"} value={74} />
          <GraphItem icon={instagramIcon} title={"Instagram"} value={45} />
          <GraphItem icon={twitterIcon} title={"Twitter"} value={40} />
          <GraphItem icon={steemitIcon} title={"Steemit"} value={24} />
          <GraphItem icon={redditIcon} title={"Reddit"} value={22} />
          <GraphItem icon={twitchIcon} title={"Twitch"} value={20} />
          <GraphItem icon={othersIcon} title={"Others"} value={14} />
        </div>
      </div>
    </div>
  );
};

ReviewAndBuzzGraph.propTypes = {};

ReviewAndBuzzGraph.defaultProps = {};

export default ReviewAndBuzzGraph;
