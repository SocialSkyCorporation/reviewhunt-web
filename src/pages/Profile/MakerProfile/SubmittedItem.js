import React, { useState } from "react";
import PropTypes from "prop-types";
import { Input, Button, Spin } from "antd";
import SimpleButton from "components/SimpleButton";
import approvedImg from "assets/images/approved.svg";
import rejectedImg from "assets/images/rejected.svg";
import greenStarEmpty from "assets/images/green-star.svg";
import greenStar from "assets/images/green-star-filled.svg";
import fullScreenImg from "assets/images/fullscreen-dark.svg";
import Linkify from "react-linkify";
import { toTimeAgo } from "utils/date";
const { TextArea } = Input;

const questTypeDictionary = {
  general_1: "Quest 1",
  general_2: "Quest 2",
  general_3: "Quest 3",
  review: "Review",
  buzz: "Buzz"
};

const RateStars = ({ defaultRate = 3 }) => {
  const [rate, setRate] = useState(defaultRate);
  const MAX_RATE = 5;

  return (
    <div className="row-align-center">
      {new Array(rate).fill(undefined).map((item, index) => {
        return (
          <img
            className="green-star"
            onClick={() => setRate(index + 1)}
            key={index}
            src={greenStar}
          />
        );
      })}
      {new Array(5 - rate).fill(undefined).map((item, index) => {
        return (
          <img
            className="green-star"
            onClick={() => setRate(rate + index + 1)}
            key={index}
            src={greenStarEmpty}
          />
        );
      })}
    </div>
  );
};

const SubmittedItem = ({
  fullScreen,
  data,
  noBorder,
  onClick,
  onApproveClick,
  onRejectClick,
  approved,
  rejected
}) => {
  const {
    image,
    hunter_name,
    quest_title,
    proof_url,
    channel,
    quest_quest_type,
    created_at,
    submitting
  } = data;

  const [inputVisible, setInputVisible] = useState(false);

  let description = null;

  if (quest_quest_type === "buzz") {
    description = (
      <div className="buzz-rate-container">
        <div>Reward Suggestion - {"$16.5"}</div>
        <div className="text-grey rate-content-text">Rate this content:</div>
        <div className="row-align-center">
          <RateStars />
          <div className="estimate-text">$33.0</div>
        </div>
      </div>
    );
  }

  return (
    <div className="submitted-item">
      <Spin spinning={submitting === true} tip="Loading...">
        <img className="submitted-item-img" src={image} alt="" />
        <div className="submitted-item-type text-grey uppercase">
          {questTypeDictionary[quest_quest_type]}
        </div>
        {quest_quest_type === "buzz" ? (
          <Linkify>
            <div className="submitted-item-title">{proof_url}</div>
          </Linkify>
        ) : (
          <div className="submitted-item-title text-black">{quest_title}</div>
        )}
        <div className="text-grey">{hunter_name}</div>
        <div className="text-grey">{toTimeAgo(created_at)}</div>
        {!fullScreen && (
          <img
            onClick={onClick}
            className="fullscreen-img"
            src={fullScreenImg}
            alt=""
          />
        )}

        {description}

        <div className="row-space-between" style={{ marginTop: 16 }}>
          <SimpleButton
            type="danger"
            className="submitted-item-button"
            text="Reject"
            borderColor="rgba(245, 34, 45, 0.7)"
            hoverColor="rgba(245, 34, 45, 0.7)"
            color="rgba(245, 34, 45, 0.7)"
            style={{ minWidth: 120 }}
            onClick={() => setInputVisible(true)}
          />
          <SimpleButton
            inverse
            className="submitted-item-button"
            text="Approve"
            style={{ minWidth: 120 }}
            onClick={onApproveClick}
          />
        </div>

        {inputVisible && (
          <div className="reject-reason-container">
            <TextArea
              style={{ marginTop: 16, height: 80 }}
              placeholder="Reason"
            />
            <Button
              style={{ float: "right", marginTop: 8 }}
              onClick={onRejectClick}
            >
              Submit
            </Button>
          </div>
        )}

        {!noBorder && <div className="bottom-divider" />}

        {approved && (
          <img className="approved-rejected-icon" src={approvedImg} alt="" />
        )}
        {rejected && (
          <img className="approved-rejected-icon" src={rejectedImg} alt="" />
        )}
      </Spin>
    </div>
  );
};

SubmittedItem.propTypes = {};

SubmittedItem.defaultProps = {};

export const EmptySubmittedItem = () => <div className="submitted-item" />;

export default SubmittedItem;
