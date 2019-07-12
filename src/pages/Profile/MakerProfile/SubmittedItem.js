import React from "react";
import PropTypes from "prop-types";
import SimpleButton from "components/SimpleButton";
import approvedImg from 'assets/images/approved.svg';
import rejectedImg from 'assets/images/rejected.svg';

const SubmittedItem = ({data, noBorder, onClick, approved, rejected}) => {
  const {image, proof_url, channel} = data;
  return (
    <div className="submitted-item" onClick={onClick}>
      <img className="submitted-item-img" src={image} alt=""/>
      <div className="submitted-item-type text-small text-grey uppercase">
        Quest 1
      </div>
      <div className="submitted-item-title text-black">
        Make your first bark.
      </div>
      <div className="text-small text-grey">YoungHwi Cho</div>
      <div className="text-small text-grey">5 min ago</div>
      <div className="row-space-between" style={{ marginTop: 16 }}>
        <SimpleButton
          type="danger"
          className="submitted-item-button"
          text="Reject"
          borderColor="rgba(245, 34, 45, 0.7)"
          inverse
          style={{minWidth: 120}}
        />
        <SimpleButton className="submitted-item-button" text="Approve"
          style={{minWidth: 120}}
         />
      </div>
      {!noBorder && <div className="bottom-divider" />}
      {approved && <img className="approved-rejected-icon" src={approvedImg} alt=""/>}
      {rejected && <img className="approved-rejected-icon" src={rejectedImg} alt=""/>}
    </div>
  );
};

SubmittedItem.propTypes = {};

SubmittedItem.defaultProps = {};

export const EmptySubmittedItem = () => <div className="submitted-item" />;

export default SubmittedItem;
