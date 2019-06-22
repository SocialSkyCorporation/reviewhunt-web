import React from "react";
import PropTypes from "prop-types";
import DragAndDrop from "components/DragAndDrop";

export const Input = ({ title, onChange }) => {
  return (
    <div className="title-input-container">
      <div className="row-space-between title-input-header text-grey">
        <div>Product Name</div>
        <div>51/60</div>
      </div>
      <input
        className="title-input-box text-black"
        placeholder="Product Name"
      />
    </div>
  );
};

Input.propTypes = {};

Input.defaultProps = {};

export const Screenshot = ({ title, onChange, handleDrop, files = [] }) => {
  return (
    <div className="title-input-container">
      <div className="row-space-between title-input-header text-grey">
        <div>Product Name</div>
        <div>51/60</div>
      </div>
      <DragAndDrop />
    </div>
  );
};
