import React from "react";
import PropTypes from "prop-types";
import { Icon, Result } from "antd";

const CampaignStatus = ({ data }) => {
  const { status } = data;
  console.log("status", status);

  let icon = null;
  let title = "";
  let subtitle = "";

  switch (status) {
    case "submitted":
      title = "Your campaign was submitted";
      subtitle =
        "Please wait until the team reviews the campaign.";
      icon = <Icon type="ellipsis" style={{ color: "#f5a623" }} />;
      break;
    case "paid":
      title = "Your campaign was paid";
      subtitle =
        "The campaign will begin once the Reviewhunt team has confirmed that the campaign satisfies the guideline.";
      icon = <Icon type="dollar" style={{ color: "#52c41a" }} />;
      break;
    case "request_edit":
      title = "Your campaign requires additional information";
      subtitle =
        "Please review the information below:";
      icon = <Icon type="issues-close" style={{ color: "#ff597a" }} />;
      break;
    case "rejected":
      title = "Your campaign was rejected";
      subtitle =
        "Please review the guideline and submit the campaign again.";
      icon = <Icon type="close" style={{ color: "#ff597a" }} />;
      break;
    case "refunded":
      title = "Your fund has been refunded";
      subtitle =
        "The process may take up to 2 to 5 business days.";
      icon = <Icon type="undo" style={{ color: "#52c41a" }} />;
      break;
    case "converting_hunt":
      title = "Your fund is being converted";
      subtitle =
        "The campaign should be up and running shortly.";
      icon = <Icon type="swap" style={{ color: "#fa6f6f" }} />;
      break;
    case "distributing":
      title = "The hunters are being compensated";
      subtitle =
        "We are in process of compensating the participants.";
      icon = <Icon type="export" style={{ color: "#52c41a" }} />;
      break;
    case "completed":
      title = "Campaign successful";
      subtitle =
        "The campaign has been completed.";
      icon = <Icon type="file-done" style={{ color: "#4d4d4d" }} />;
      break;
  }

  return (
    <div className="content-quest">
      <Result icon={icon} title={title} subTitle={subtitle} />
    </div>
  );
};

CampaignStatus.propTypes = {};

CampaignStatus.defaultProps = {};

export default CampaignStatus;
