import React, { useState } from "react";
import PropTypes from "prop-types";
import { Input, Modal, Select } from "antd";
import deleteImg from "assets/images/delete.svg";
import { useTranslation } from "react-i18next";
import {OptimizedInput, OptimizedInputPassword, OptimizedSelect} from 'pages/Auth/OptimizedFormTypes';

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
  children,
  onChange,
  onDeletePressed,
  onChangePassword,
  onChangePasswordConfirm,
  autoComplete
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="profile-row">
      <div className="text-container">
        <div className="title">{title}</div>
        {editMode == true ? (
          <>
            {type === TYPE_DROPDOWN && (
              <OptimizedSelect
                defaultValue={value}
                className="value-container select gray-bg-select text-grey"
              >
                {children}
              </OptimizedSelect>
            )}
            {type === TYPE_PASSWORD && (
              <div className="password-container">
                <OptimizedInputPassword
                  type="password"
                  className="value-container text-grey"
                  placeholder={t("current_password")}
                  onChange={onChangePassword}
                  autoComplete="new-password"
                />
                <OptimizedInputPassword
                  type="password"
                  className="value-container password text-grey"
                  placeholder={t("new_password")}
                  onChange={onChangePasswordConfirm}
                  autoComplete="new-password"
                />
              </div>
            )}
            {type === TYPE_SOCIAL && (
              <div className="social-container">
                <OptimizedInput
                  className="value-container text-grey"
                  value={value}
                  onChange={onChange}
                  autoComplete={autoComplete}
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
              <OptimizedInput
                value={value}
                className="value-container"
                onChange={onChange}
                autoComplete={autoComplete}
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
          title={t("delete_channel")}
          visible={modalVisible}
          onOk={() => {
            setModalVisible(false);
            onDeletePressed();
          }}
          onCancel={() => setModalVisible(false)}
          okText={t("ok")}
          cancelText={t("cancel")}
        >
          <p>
            {t("confirm_delete")} {value}?
          </p>
        </Modal>
      </div>
    </div>
  );
};

ProfileRow.propTypes = {
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  editMode: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  type: PropTypes.string,
  password: PropTypes.bool
};

ProfileRow.defaultProps = {
  type: TYPE_INPUT
};

export { TYPE_DROPDOWN, TYPE_PASSWORD, TYPE_SOCIAL, TYPE_INPUT };
export default ProfileRow;
