import React, { useState, useContext } from "react";
import { Spin } from "antd";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import SimpleButton from "components/SimpleButton";
import AuthContext from "contexts/AuthContext";
import ProfileRow, {
  TYPE_DROPDOWN,
  // TYPE_SOCIAL,
  TYPE_PASSWORD
} from "../ProfileRow";

const SettingTab = ({}) => {
  const { t } = useTranslation();
  const {
    emailMe,
    emailMeUpdate,
    editProfile,
    updatingUserInformation,
    updateState,
    updateEmailForm,
    updateUserInformation
  } = useContext(AuthContext);

  let valueToShow = emailMe;

  if (emailMeUpdate && editProfile) {
    valueToShow = emailMeUpdate;
  }

  const { name, email, company_name, business_category } = valueToShow;

  return (
    <Spin spinning={updatingUserInformation} tip="Updating...">
      <form>
        <div className="content-profile">
          <div className="content-title text-black">
            {t("profile.basic_information").toUpperCase()}
          </div>
          <ProfileRow
            title={t("name")}
            value={name}
            editMode={editProfile}
            onChange={e => updateEmailForm("name", e.target.value)}
            autoComplete={"name"}
          />
          <ProfileRow
            title={t("email")}
            value={email}
            editMode={editProfile}
            onChange={e => updateEmailForm("email", e.target.value)}
            autoComplete={"username email"}
          />
          <ProfileRow
            title={"Company Name"}
            value={company_name}
            editMode={editProfile}
            onChange={e => updateEmailForm("company_name", e.target.value)}
            autoComplete={"organization"}
          />
          <ProfileRow
            title={"Business Category"}
            value={business_category}
            type={TYPE_DROPDOWN}
            editMode={editProfile}
            onChange={e => updateEmailForm("business_category", e.target.value)}
            autoComplete={""}
          />
          <ProfileRow
            title={t("password")}
            value="password"
            type={TYPE_PASSWORD}
            editMode={editProfile}
            password={true}
            onChangePassword={e =>
              updateEmailForm("old_password", e.target.value)
            }
            onChangePasswordConfirm={e =>
              updateEmailForm("new_password", e.target.value)
            }
          />

          <div className="button-container">
            <SimpleButton
              onClick={() => {
                if (editProfile) {
                  updateUserInformation();
                } else {
                  updateState("editProfile", !editProfile);
                }
              }}
              text={
                editProfile
                  ? t("submit").toUpperCase()
                  : t("profile.edit_profile").toUpperCase()
              }
            />
            {editProfile && (
              <div
                className="cancel-button"
                onClick={() => {
                  updateState("emailMeUpdate", emailMe);
                  updateState("editProfile", false);
                }}
              >
                {t("cancel").toUpperCase()}
              </div>
            )}
          </div>
        </div>
      </form>
    </Spin>
  );
};

SettingTab.propTypes = {};

SettingTab.defaultProps = {};

export default SettingTab;
