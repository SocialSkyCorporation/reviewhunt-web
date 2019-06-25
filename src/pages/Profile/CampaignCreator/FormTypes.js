import React from "react";
import { Input, Icon } from "antd";
import PropTypes from "prop-types";
import DragAndDrop from "components/DragAndDrop";
import websiteImg from "assets/images/website.svg";
import appstoreImg from "assets/images/appstore.svg";
import playstoreImg from "assets/images/playstore.svg";

const { TextArea } = Input;

export const TextInput = ({
  title,
  onChange,
  containerStyle,
  textArea = false,
  textAreaHeight = 32,
  value,
  setValue
}) => {
  return (
    <div className="title-input-container" style={containerStyle}>
      <div className="row-space-between title-input-header text-grey">
        <div>{title}</div>
        <div>51/60</div>
      </div>

      {textArea ? (
        <TextArea style={{height: textAreaHeight}} onChange={e => setValue(e.target.value)} value={value}/>
      ) : (
        <Input className="title-input-box text-black" onChange={e => setValue(e.target.value)} value={value}/>
      )}
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
      <DragAndDrop single />
    </div>
  );
};

