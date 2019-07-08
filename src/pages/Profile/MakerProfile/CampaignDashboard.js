import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Menu, Modal, Select, Icon } from "antd";
import ProgressBar from "components/ProgressBar";
import SubmittedItem, { EmptySubmittedItem } from "./SubmittedItem";
import CampaignContext from "contexts/CampaignContext";
import { numberWithCommas } from "utils/helpers/numberFormatHelper";
import CircularProgress from "components/CircularProgress";
import ReviewAndBuzzGraph from "./ReviewAndBuzzGraph";
import prevImg from "assets/images/prev.svg";
import nextImg from "assets/images/next.svg";

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
  const [current, setCurrent] = useState("pending");
  const [modalVisible, setModalVisible] = useState(false);
  const { currentCampaign, fetchingSubmittedQuests } = useContext(
    CampaignContext
  );

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
        <div className="text-blue text-small hover-link" style={{marginTop: 8}}>
          See campaign brief
          <Icon type="right" style={{marginLeft: 4}}/>
        </div>
        {/*<div
          className="row-align-center"
          style={{ marginTop: 16, marginBottom: 16 }}
        >
          <SimpleButton
            onClick={onEditDescClicked}
            text="Edit Description"
            style={{ marginRight: 10 }}
          />
          <SimpleButton onClick={onEditQuestClicked} text="Edit Quest" />
        </div>*/}

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

        <div
          className="text-small text-black uppercase"
          style={{ marginTop: 24 }}
        >
          Review and Buzz
        </div>
        <div className="divider-line" style={{ marginTop: 5 }} />

        <ReviewAndBuzzGraph />

        <div
          className="text-small text-black uppercase"
          style={{ marginTop: 30 }}
        >
          Manage Quest Submissions
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
            <>
              {submittedQuests.map((submittedQuest, index) => (
                <SubmittedItem
                  onClick={() => setModalVisible(true)}
                  key={submittedQuest.id}
                />
              ))}
              <SubmittedItem
                key={1}
                onClick={() => setModalVisible(true)}
                approved
              />
              <SubmittedItem
                key={2}
                onClick={() => setModalVisible(true)}
                rejected
              />
              <SubmittedItem key={3} />
              <SubmittedItem key={4} />
              <SubmittedItem key={5} />
              <EmptySubmittedItem />
            </>
          )}
        </div>
        <Modal
          maskClosable={true}
          onCancel={() => setModalVisible(false)}
          visible={modalVisible}
          footer={null}
          style={{ maxWidth: 300, minWidth: 255 }}
          bodyStyle={{ paddingTop: 48 }}
        >
          <div>
            <SubmittedItem noBorder />
            <img className="prev-button" src={prevImg} />
            <img className="next-button" src={nextImg} />
          </div>
        </Modal>
      </div>
    </>
  );
};

CampaignDashboard.propTypes = {};

CampaignDashboard.defaultProps = {
  submittedQuests: []
};

export default CampaignDashboard;
