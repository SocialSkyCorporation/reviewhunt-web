import React from "react";
import PropTypes from "prop-types";
import SimpleButton from "components/SimpleButton";

const SubmittedItem = ({}) => {
  return (
    <div className="submitted-item">
      <img className="submitted-item-img" />
      <div className="submitted-item-type text-small text-grey uppercase">Quest 1</div>
      <div className="submitted-item-title text-black">Make your first bark.</div>
      <div className="text-small text-grey">YoungHwi Cho</div>
      <div className="text-small text-grey">5 min ago</div>
      <div className="row-space-between" style={{marginTop: 16}}>
        <SimpleButton type="danger" className="submitted-item-button" text="Reject" />
        <SimpleButton className="submitted-item-button" text="Approve" />
      </div>
      <div className="bottom-divider"/>
    </div>
  );
};

SubmittedItem.propTypes = {};

SubmittedItem.defaultProps = {};

export default SubmittedItem;
