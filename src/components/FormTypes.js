import React, { useState, useMemo } from "react";
import { Icon, Select, Slider, Input } from "antd";
import PropTypes from "prop-types";
import DragAndDrop from "components/DragAndDrop";
import { numberWithCommas } from "utils/helpers/numberFormatHelper";

const { TextArea } = Input;

export const TextInput = ({
  title,
  containerStyle,
  textArea,
  textAreaHeight,
  value,
  maxCharacters,
  setValue,
  placeholder
}) => {
  return useMemo(() => {
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
            className="title-text-area text-black"
            style={{ height: textAreaHeight }}
            placeholder={placeholder}
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
            placeholder={placeholder}
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
  }, [value]);
};

export const Dropdown = ({ title, value, children, style, onChange }) => {
  return useMemo(() => {
    return (
      <div className="title-input-container">
        {title && (
          <div className="row-space-between title-input-header text-grey">
            <div>{title}</div>
          </div>
        )}
        <Select
          defaultValue={value}
          onChange={onChange}
          className="value-container select gray-bg-select text-grey"
          style={style}
        >
          {children}
        </Select>
      </div>
    );
  }, [value]);
};

export const Screenshots = ({ onChange, images, title, single, maxBytes }) => {
  return useMemo(() => {
    return (
      <div className="title-input-container">
        <div className="row-space-between title-input-header text-grey">
          <div>{title}</div>
          {maxBytes && <div>Max {maxBytes / Math.pow(10, 6)} MB</div>}
        </div>
        <DragAndDrop
          single={single}
          maxBytes={maxBytes}
          images={images}
          onChange={onChange}
        />
      </div>
    );
  }, [images]);
};

export const BudgetSlider = ({ title, value, max, min, step, onChange }) => {
  return (
    <div className="budget-slider">
      <div className="budget-title text-grey">{title}</div>
      <div className="slider-container row-align-center">
        <Input
          onChange={e => {
            const value = e.target.value;
            const isValid =
              value === "$" || value.search(/^\$?[\d,]+(\.\d*)?$/) >= 0;

            if (isValid) {
              const num = Number(value.replace(/[\$,]/g, ""));
              if (num <= 20000) {
                onChange(num);
              }
            }
          }}
          className="budget-value text-black"
          value={`$${numberWithCommas(value)}`}
        />
        <Slider
          className="slider"
          max={max}
          min={min}
          step={step}
          value={value}
          onChange={onChange}
          tipFormatter={v => `$${numberWithCommas(v)}`}
        />
      </div>
    </div>
  );
};

TextInput.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
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
  placeholder: "",
  textAreaHeight: 32,
  textArea: false,
  maxCharacters: null,
  setValue: () => {}
};
