import React from "react";
import { Input, Icon } from "antd";
import PropTypes from "prop-types";
import DragAndDrop from "components/DragAndDrop";
import websiteImg from 'assets/images/website.svg';
import appstoreImg from 'assets/images/appstore.svg';
import playstoreImg from 'assets/images/playstore.svg';

export const TextInput = ({ title, onChange, containerStyle }) => {
  return (
    <div className="title-input-container" style={containerStyle}>
      <div className="row-space-between title-input-header text-grey">
        <div>{title}</div>
        <div>51/60</div>
      </div>
      <Input
        className="title-input-box text-black"
        placeholder="Product Name"
      />
    </div>
  );
};

Input.propTypes = {};

Input.defaultProps = {};

export const Screenshots = ({ title, single }) => {
  return (
    <div className="title-input-container">
      <div className="row-space-between title-input-header text-grey">
        <div>{title}</div>
        <div>5.5 / 10 MB</div>
      </div>
      <DragAndDrop single/>
    </div>
  );
};


export const ProductLinks = ({ title, onChange }) => {
  return (
    <div className="title-input-container">
      <div className="row-space-between title-input-header text-grey">
        <div>Product Links</div>
      </div>
      <Input
        addonBefore={<img src={websiteImg} alt=""/>}
        className="title-input-box title-icon-input-box text-black"
        placeholder="Website URL"
      />
      <Input
        addonBefore={<img src={appstoreImg} alt=""/>}
        className="title-input-box title-icon-input-box text-black"
        placeholder="App Store"
      />
      <Input
        addonBefore={<img src={playstoreImg} alt=""/>}
        className="title-input-box title-icon-input-box text-black"
        placeholder="Google Play"
      />
    </div>
  );
};
