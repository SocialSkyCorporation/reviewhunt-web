import React, { useState, memo } from "react";
import { Input } from "antd";
import PropTypes from "prop-types";
import DragAndDrop from "components/DragAndDrop";

const { TextArea } = Input;

export const TextInput = memo(
  ({
    title,
    containerStyle,
    textArea,
    textAreaHeight,
    value,
    maxCharacters,
    setValue
  }) => {
    return (
      <div className="title-input-container" style={containerStyle}>
        <div className="row-space-between title-input-header text-grey">
          <div>{title}</div>
          {maxCharacters && (
            <div>
              {value.length}/{maxCharacters}
            </div>
          )}
        </div>

        {textArea ? (
          <TextArea
            style={{ height: textAreaHeight }}
            onChange={e => {
              if (maxCharacters && e.target.value.length > maxCharacters) {
                return;
              }
              setValue(e.target.value);
            }}
            value={value}
          />
        ) : (
          <Input
            className="title-input-box text-black"
            onChange={e => {
              if (maxCharacters && e.target.value.length > maxCharacters) {
                return;
              }
              setValue(e.target.value);
            }}
            value={value}
          />
        )}
      </div>
    );
  },
  ({ value: prevValue }, { value: nextValue }) => prevValue === nextValue
);


export const Screenshots = ({onChange, images, title, single, maxBytes }) => {
  return (
    <div className="title-input-container">
      <div className="row-space-between title-input-header text-grey">
        <div>{title}</div>
        {maxBytes && <div>Max {maxBytes / Math.pow(10, 6)} MB</div>}
      </div>
      <DragAndDrop single={single} maxBytes={maxBytes} images={images} onChange={onChange}/>
    </div>
  );
};


TextInput.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  containerStyle: PropTypes.object,
  textAreaHeight: PropTypes.number,
  textArea: PropTypes.bool,
  maxCharacters: PropTypes.number,
  setValue: PropTypes.func
};

TextInput.defaultProps = {
  title: "",
  value: "",
  containerStyle: {},
  textAreaHeight: 32,
  textArea: false,
  maxCharacters: null,
  setValue: () => {},
};