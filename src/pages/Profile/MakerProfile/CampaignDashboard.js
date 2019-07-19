import React, { useContext, useState, useEffect } from "react";
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

const filterDictionary = {
  all: ["general_1", "general_2", "general_3", "buzz", "review"],
  quest: ["general_1", "general_2", "general_3"],
  review: ["review"],
  buzz: ["buzz"]
};

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
  const [currentTab, setCurrentTab] = useState("pending");
  const [currentFilter, setCurrentFilter] = useState("all");
  const [modalVisible, setModalVisible] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const {
    currentCampaign,
    submittedItems,
    fetchSubmittedQuests,
    fetchingSubmittedQuests,
    approveSubmittedItem,
    rejectSubmittedItem
  } = useContext(CampaignContext);

  useEffect(() => {
    fetchSubmittedQuests(currentCampaign.id);
  }, []);

  if (!currentCampaign) return null;

  const {
    bounty_left,
    total_bounty,
    current_participant_count
  } = currentCampaign;

  const prevClicked = () => {
    setCurrentItemIndex(Math.max(0, currentItemIndex - 1));
  };

  const nextClicked = () => {
    setCurrentItemIndex(
      Math.min(submittedItems.length - 1, currentItemIndex + 1)
    );
  };

  let questsToApprove = 0;

  let channelCounts = {};
  let totalBuzzCount = 0;

  submittedItems.forEach(item => {
    if (item.status === "pending") questsToApprove++;
    if (item.channel !== null && !channelCounts[item.channnel])
      channelCounts[item.channel] = 0;
    if (item.channel) {
      totalBuzzCount++;
      channelCounts[item.channel] += 1;
    }
  });

  return (
    <>
      <ProgressBar height={8} progress={(1 / 5) * 100} />
      <div className="content-dashboard">
        <div className="text-black text-subheader">BARK</div>
        <div className="text-small text-grey">
          Transforms people nearby into fun barking dogs
        </div>
        <div
          className="text-blue text-small hover-link"
          style={{ marginTop: 8 }}
        >
          See campaign brief
          <Icon type="right" style={{ marginLeft: 4 }} />
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
            value={questsToApprove}
            totalValue={submittedItems.length}
          />
        </div>

        <div
          className="text-small text-black uppercase"
          style={{ marginTop: 24 }}
        >
          Review and Buzz
        </div>
        <div className="divider-line" style={{ marginTop: 5 }} />

        <ReviewAndBuzzGraph
          channelCounts={channelCounts}
          totalCount={totalBuzzCount}
        />

        <div
          className="text-small text-black uppercase"
          style={{ marginTop: 30 }}
        >
          Manage Quest Submissions
        </div>

        <div className="row-align-center menu-container">
          <Menu
            onClick={e => setCurrentTab(e.key)}
            mode="horizontal"
            selectedKeys={[currentTab]}
            style={{ flex: 1 }}
          >
            <Menu.Item key="pending">Pending</Menu.Item>
            <Menu.Item key="approved">Approved</Menu.Item>
            <Menu.Item key="rejected">Rejected</Menu.Item>
          </Menu>
          <Select
            className="select-filter"
            defaultValue={currentFilter}
            onChange={v => {
              setCurrentFilter(v);
            }}
          >
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
              {submittedItems
                .filter(item => item.status === currentTab)
                .filter(item =>
                  filterDictionary[currentFilter].includes(
                    item.quest_quest_type
                  )
                )
                .map((submittedQuest, index) => {
                  return (
                    <SubmittedItem
                      onClick={() => {
                        setCurrentItemIndex(index);
                        setModalVisible(true);
                      }}
                      onApproveClick={() => approveSubmittedItem(index)}
                      onRejectClick={() => rejectSubmittedItem(index)}
                      data={submittedQuest}
                      key={submittedQuest.id}
                    />
                  );
                })}
            </>
          )}
        </div>
        <Modal
          maskClosable={true}
          onCancel={() => setModalVisible(false)}
          visible={modalVisible}
          footer={null}
          style={{
            display: "flex"
          }}
          bodyStyle={{ paddingTop: 48 }}
          wrapClassName="content-dashboard"
        >
          <SubmittedItem
            fullScreen
            noBorder
            data={submittedItems && submittedItems[currentItemIndex]}
            onApproveClick={() => approveSubmittedItem(currentItemIndex)}
            onRejectClick={() => rejectSubmittedItem(currentItemIndex)}
          />
          {currentItemIndex > 0 && (
            <img onClick={prevClicked} className="prev-button" src={prevImg} />
          )}
          {currentItemIndex < submittedItems.length - 1 && (
            <img onClick={nextClicked} className="next-button" src={nextImg} />
          )}
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
