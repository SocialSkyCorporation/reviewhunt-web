import React, { useState } from "react";
import PropTypes from "prop-types";
import { Input, Modal, Select } from "antd";
import deleteImg from "assets/images/delete.svg";

const TYPE_DROPDOWN = "DROPDOWN";
const TYPE_PASSWORD = "PASSWORD";
const TYPE_SOCIAL = "SOCIAL";
const TYPE_INPUT = "INPUT";

const ProfileRow = ({
  title,
  value,
  editMode,
  type,
  password,
  onDeletePressed
}) => {
  const [textValue, setTextValue] = useState(value);
  const [modalVisible, setModalVisible] = useState(false);

  const onChange = e => setTextValue(e.nativeEvent.target.value);

  return (
    <div className="profile-row">
      <div className="text-container">
        <div className="title">{title}</div>
        {editMode ? (
          <>
            {type === TYPE_DROPDOWN && (
              <Select
                defaultValue={value}
                className="value-container select text-grey"
              />
            )}
            {type === TYPE_PASSWORD && (
              <div className="password-container">
                <Input
                  className="value-container text-grey"
                  placeholder="Current password"
                  onChange={onChange}
                />
                <Input
                  className="value-container password text-grey"
                  placeholder="New password"
                  onChange={onChange}
                />
              </div>
            )}
            {type === TYPE_SOCIAL && (
              <div className="social-container">
                <Input
                  className="value-container text-grey"
                  value={textValue}
                  onChange={onChange}
                />
                <img
                  className="social-delete-button"
                  src={deleteImg}
                  alt=""
                  onClick={() => setModalVisible(true)}
                />
              </div>
            )}
            {type === TYPE_INPUT && (
              <Input
                value={textValue}
                className="value-container"
                onChange={onChange}
              />
            )}
          </>
        ) : (
          <div className="value">{password ? "******" : value}</div>
        )}
      </div>
      <div className="divider" />
      <div>
        <Modal
          title="Modal"
          visible={modalVisible}
          onOk={() => {
            setModalVisible(false);
            onDeletePressed();
          }}
          onCancel={() => setModalVisible(false)}
          okText="Ok"
          cancelText="Cancel"
        >
          <p>Are you sure you want to delete {value}?</p>
        </Modal>
      </div>
    </div>
  );
};

ProfileRow.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  editMode: PropTypes.bool,
  type: PropTypes.string,
  password: PropTypes.bool
};

ProfileRow.defaultProps = {
  type: TYPE_INPUT
};

export { TYPE_DROPDOWN, TYPE_PASSWORD, TYPE_SOCIAL, TYPE_INPUT };
export default ProfileRow;
