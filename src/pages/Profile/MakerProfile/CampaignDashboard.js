import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Menu, Select, Icon } from "antd";
import { Link } from "react-router-dom";
import ProgressBar from "components/ProgressBar";
import SimpleButton from "components/SimpleButton";
import SubmittedItem from "./SubmittedItem";
import NewCampaignContext from "contexts/NewCampaignContext";
import CampaignContext from "contexts/CampaignContext";
import questImg from "assets/images/quest-circle.svg";
import { numberWithCommas } from "utils/helpers/numberFormatHelper";
import CircularProgress from "components/CircularProgress";

const { Option } = Select;

const StatItem = props => {
  const { title, value, totalValue } = props;
  return (
    <div className="dashboard-stat-item">
      <div className="stat-item-line" />
      <div className="stat-item-title text-small text-grey uppercase">
        {title}
      </div>
      <div className="row-align-center">
        <div className="stat-item-value">{value}</div>
        {totalValue && (
          <div className="text-small text-grey" style={{ marginLeft: 4 }}>
            / {totalValue}
          </div>
        )}
      </div>
    </div>
  );
};

const CampaignDashboard = ({
  onEditQuestClicked,
  onEditDescClicked,
  submittedQuests
}) => {
  const [current, setCurrent] = useState("quests");
  const { currentCampaign, fetchingSubmittedQuests } = useContext(
    CampaignContext
  );
  console.log("curr", currentCampaign);

  if (!currentCampaign) return null;

  const {
    bounty_left,
    total_bounty,
    current_participant_count
  } = currentCampaign;

  return (
    <>
      <ProgressBar height={8} progress={(1 / 5) * 100} />
      <div className="content-dashboard">
        <div className="text-black text-subheader">BARK</div>
        <div className="text-small text-grey">
          Transforms people nearby into fun barking dogs
        </div>
        <div
          className="row-align-center"
          style={{ marginTop: 16, marginBottom: 16 }}
        >
          <SimpleButton
            onClick={onEditDescClicked}
            text="Edit Description"
            style={{ marginRight: 10 }}
          />
          <SimpleButton onClick={onEditQuestClicked} text="Edit Quest" />
        </div>

        <div className="stat-items row-align-center">
          <StatItem
            title="Remaining Balance"
            value={`$${numberWithCommas(bounty_left)}`}
            totalValue={`$${numberWithCommas(total_bounty)}`}
          />
          <StatItem
            title="Hunters on Quest"
            value={current_participant_count}
          />
          <StatItem
            title="Quests to approve"
            value={`$${numberWithCommas(bounty_left)}`}
            totalValue={`$${numberWithCommas(total_bounty)}`}
          />
        </div>

        <div className="manage-quest-header">
          <div
            className="text-small text-black uppercase"
            style={{ marginTop: 24 }}
          >
            Manage Quest Submissions
          </div>
        </div>

        <div className="row-align-center menu-container">
          <Menu
            onClick={e => setCurrent(e.key)}
            mode="horizontal"
            selectedKeys={[current]}
            style={{ flex: 1 }}
          >
            <Menu.Item key="pending">Pending</Menu.Item>
            <Menu.Item key="approved">Approved</Menu.Item>
            <Menu.Item key="rejected">Rejected</Menu.Item>
          </Menu>
          <Select className="select-filter" defaultValue={"All"}>
            <Option key="all">All</Option>
            <Option key="quest">Quest</Option>
            <Option key="review">Review</Option>
            <Option key="buzz">Buzz</Option>
          </Select>
        </div>
        <div className="submitted-items row-align-center">
          {fetchingSubmittedQuests ? (
            <CircularProgress />
          ) : (
            submittedQuests.map((submittedQuest, index) => (
              <SubmittedItem key={submittedQuest.id} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

CampaignDashboard.propTypes = {};

CampaignDashboard.defaultProps = {
  submittedQuests: []
};

export default CampaignDashboard;
