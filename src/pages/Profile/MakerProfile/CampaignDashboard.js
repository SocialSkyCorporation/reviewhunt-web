import React from "react";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom';
import ProgressBar from "components/ProgressBar";
import SimpleButton from "components/SimpleButton";
import SubmittedItem from './SubmittedItem';
import NewCampaignContext from 'contexts/NewCampaignContext';

const StatItem = props => {
  const { title, value, totalValue } = props;
  return (
    <div className="dashboard-stat-item">
      <div className="stat-item-line" />
      <div className="stat-item-title text-small text-grey uppercase">
        Remaining balance
      </div>
      <div className="row-align-center">
        <div className="stat-item-value">$3,500 </div>
        <div className="text-small text-grey" style={{marginLeft: 4}}>/ $10,500</div>
      </div>
    </div>
  );
};

const CampaignDashboard = ({onEditQuestClicked, onEditDescClicked}) => {
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
          <SimpleButton onClick={onEditDescClicked} text="Edit Description" style={{ marginRight: 10 }} />
          <SimpleButton onClick={onEditQuestClicked} text="Edit Quest" />
        </div>

        <div className="stat-items row-align-center">
          <StatItem />
          <StatItem />
          <StatItem />
        </div>

        <div className="text-small text-black uppercase" style={{marginTop: 16}}>Manage Quest Submissions</div>
        <SimpleButton className="dashboard-approve-button" text="Approve all submissions"/>

        <div className="submitted-items row-align-center">
        <SubmittedItem/>
        <SubmittedItem/>
        </div>
      </div>
    </>
  );
};

CampaignDashboard.propTypes = {};

CampaignDashboard.defaultProps = {};

export default CampaignDashboard;
