import React from 'react';
import PropTypes from 'prop-types';
import { Input, Select } from 'antd';
import deleteImg from 'assets/images/delete.svg';

const TYPE_DROPDOWN = 'DROPDOWN';
const TYPE_PASSWORD = 'PASSWORD';
const TYPE_SOCIAL = 'SOCIAL';
const TYPE_INPUT = 'INPUT';

const ProfileRow = ({ title, value, editMode, type, password }) => (
  <div className="profile-row">
    <div className="text-container">
      <div className="title">{title}</div>
      {editMode ? (
        <>
          {type === TYPE_DROPDOWN && (
            <Select defaultValue={value} className="value-container select" />
          )}
          {type === TYPE_PASSWORD && (
            <div className="password-container">
              <Input
                className="value-container"
                placeholder="Current password"
              />
              <Input className="value-container" placeholder="New password" />
            </div>
          )}
          {type === TYPE_SOCIAL && (
            <div className="social-container">
              <img src={deleteImg} />
              <div className="value social-value">{value}</div>
            </div>
          )}
          {type === TYPE_INPUT && (
            <Input value={value} className="value-container" />
          )}
        </>
      ) : (
        <div className="value">{password ? '******' : value}</div>
      )}
    </div>
    <div className="divider" />
  </div>
);

ProfileRow.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  editMode: PropTypes.bool,
  type: PropTypes.string,
  password: PropTypes.bool
};

ProfileRow.defaultProps ={
  type: TYPE_INPUT
}


export { TYPE_DROPDOWN, TYPE_PASSWORD, TYPE_SOCIAL, TYPE_INPUT };
export default ProfileRow;
