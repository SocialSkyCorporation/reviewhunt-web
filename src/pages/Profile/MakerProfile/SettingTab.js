import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import SimpleButton from "components/SimpleButton";
import ProfileRow, {
  TYPE_DROPDOWN,
  // TYPE_SOCIAL,
  TYPE_PASSWORD
} from "../ProfileRow";

const SettingTab = ({}) => {
  const { t } = useTranslation();
  const [editProfile, setEditProfile] = useState(false);

  return (
    <div>
      <div className="content-profile">
        <div className="content-title text-black">
          {t("profile.basic_information").toUpperCase()}
        </div>
        <ProfileRow title={t("name")} value={""} editMode={editProfile} />
        <ProfileRow title={t("email")} value={""} editMode={editProfile} />
        <ProfileRow title={"Company Name"} value={""} editMode={editProfile} />
        <ProfileRow
          title={"Business Category"}
          value={""}
          type={TYPE_DROPDOWN}
          editMode={editProfile}
        />
        <ProfileRow
          title={t("country")}
          value={""}
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
