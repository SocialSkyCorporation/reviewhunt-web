import React from "react";
import { AppConsumer } from "contexts/AppContext";
import { Link } from "react-router-dom";
import imgLogo from "assets/images/logo-rh@2x.png";
import { useTranslation } from "react-i18next";

export default () => {
  const { t } = useTranslation();

  return (
    <AppConsumer>
      {({ login }) => (
        <div className="header">
          <Link to="/">
            <img className="logo" src={imgLogo} alt="logo" />
          </Link>

          <div className="header-right">
            <Link className="header-item" to="/about">
              {t('header.about')}
            </Link>

            <Link className="header-item" to="/auth">
              {t('header.login')}
            </Link>

            <Link className="header-item" to="/auth">
              {t('header.join')}
            </Link>
            <Link className="header-item" to="/profile">
              {t('header.profile')}
            </Link>
          </div>
        </div>
      )}
    </AppConsumer>
  );
};
