import React from "react";
import { AuthConsumer } from "contexts/AuthContext";
import { Link } from "react-router-dom";
import imgLogo from "assets/images/logo-rh@2x.png";
import imgLogoTeal from "assets/images/logo-rh.svg";
import faceImg from "assets/images/user-face.svg";
import { useTranslation } from "react-i18next";

export default () => {
  const { t } = useTranslation();
  const pathname = window.location.pathname;
  const isAboutPage = pathname.indexOf("/about") > -1;

  const headerItemClassName = `header-item ${isAboutPage && 'about'}`;

  return (
    <AuthConsumer>
      {({ emailMe }) => (
        <div className="header">
          <Link to="/">
            <img
              className="logo"
              src={isAboutPage ? imgLogoTeal : imgLogo}
              alt="logo"
            />
          </Link>

          <div className="header-right">
            <Link className={headerItemClassName} to="/about">
              {t("header.about")}
            </Link>

            {!emailMe ? (
              <>
                <Link className={headerItemClassName}  to="/auth">
                  {t("header.login")}
                </Link>

                <Link className={headerItemClassName}  to="/auth">
                  {t("header.join")}
                </Link>

                <Link className={headerItemClassName} to="/profile">
                  {t("header.profile")}
                </Link>
              </>
            ) : (
              <Link className={`header-item account ${isAboutPage && 'about'}`} to="/profile">
                <div className="row-align-center">
                  <img className="profile-icon" src={faceImg} alt="" />
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
