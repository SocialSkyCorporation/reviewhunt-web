import React, { useContext } from "react";
import AuthContext from "contexts/AuthContext";
import { Link } from "react-router-dom";
import imgLogo from "assets/images/logo-rh@2x.png";
import imgLogoTeal from "assets/images/logo-rh.svg";
import faceImg from "assets/images/user-face.svg";
import { useTranslation } from "react-i18next";

export default () => {
  const { t } = useTranslation();
  const pathname = window.location.pathname;
  const isAboutPage = pathname.indexOf("/about") > -1;
  const { logout, emailMe, authenticating } = useContext(AuthContext);

  const headerItemClassName = `header-item ${isAboutPage && "about"}`;

  return (
    <div className="header">
      <a href="/">
        <img
          className="logo"
          src={isAboutPage ? imgLogoTeal : imgLogo}
          alt="logo"
        />
      </a>

      <div className="header-right">
        <Link className={headerItemClassName} to="/about">
          {t("header.about")}
        </Link>

        {!authenticating && (
          <>
            {!emailMe ? (
              <>
                <Link className={headerItemClassName} to="/auth">
                  {t("header.login")}
                </Link>

                <Link className={headerItemClassName} to="/auth">
                  {t("header.join")}
                </Link>

                <Link className={headerItemClassName} to="/profile">
                  {t("header.profile")}
                </Link>
              </>
            ) : (
              <>
                <Link className={headerItemClassName} onClick={logout} to="">
                  {"Logout"}
                </Link>

                <Link className={headerItemClassName} to="/profile">
                  {"Dashboard"}
                </Link>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
