import React, { useState, useContext } from "react";
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
  const [editProfile, setEditProfile] = useState(false);
  const { emailMe } = useContext(AuthContext);

  const {name, email, company_name, business_category} = emailMe;

  const [nameInput, setName] = useState(name);
  const [emailInput, setEmail] = useState(email);
  const [companyNameInput, setCompanyName] = useState(company_name);
  const [businessCategoryInput, setBusinessCategory] = useState(business_category);

  return (
    <div>
      <div className="content-profile">
        <div className="content-title text-black">
          {t("profile.basic_information").toUpperCase()}
        </div>
        <ProfileRow title={t("name")} value={nameInput} editMode={editProfile} />
        <ProfileRow title={t("email")} value={emailInput} editMode={editProfile} />
        <ProfileRow title={"Company Name"} value={companyNameInput} editMode={editProfile} />
        <ProfileRow
          title={"Business Category"}
          value={businessCategoryInput}
          type={TYPE_DROPDOWN}
          editMode={editProfile}
        />
        <ProfileRow
          title={t("password")}
          value="password"
          type={TYPE_PASSWORD}
          editMode={editProfile}
          password={true}
        />

        <div className="button-container">
          <SimpleButton
            onClick={() => setEditProfile(true)}
            text={
              editProfile
                ? t("submit").toUpperCase()
                : t("profile.edit_profile").toUpperCase()
            }
          />
          {editProfile && (
            <div
              className="cancel-button"
              onClick={() => setEditProfile(false)}
            >
              {t("cancel").toUpperCase()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

SettingTab.propTypes = {};

SettingTab.defaultProps = {};

export default SettingTab;
