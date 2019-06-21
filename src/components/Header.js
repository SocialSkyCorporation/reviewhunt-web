import React from "react";
import { AuthConsumer } from "contexts/AuthContext";
import { Link } from "react-router-dom";
import imgLogo from "assets/images/logo-rh@2x.png";
import faceImg from "assets/images/user-face.svg";
import { useTranslation } from "react-i18next";

export default () => {
  const { t } = useTranslation();

  return (
    <AuthConsumer>
      {({ emailMe }) => (
        <div className="header">
          <Link to="/">
            <img className="logo" src={imgLogo} alt="logo" />
          </Link>

          <div className="header-right">
            <Link className="header-item" to="/about">
              {t("header.about")}
            </Link>

            {!emailMe ? (
              <>
                <Link className="header-item" to="/auth">
                  {t("header.login")}
                </Link>

                <Link className="header-item" to="/auth">
                  {t("header.join")}
                </Link>

                <Link className="header-item" to="/profile">
                  {t("header.profile")}
                </Link>
              </>
            ) : (
              <Link className="header-item account" to="/profile">
                <div className="row-align-center">
                  <img className="profile-icon" src={faceImg} alt=""/>
                  <div>{emailMe.name}</div>
                </div>
              </Link>
            )}
          </div>
        </div>
      )}
    </AuthConsumer>
  );
};
