import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import imgLogo from 'assets/images/logo-main-white@2x.png';
import {useTranslation} from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="not-found-page full-page primary-gradient">
      <div className="center-content">
        <img src={imgLogo} alt="Reviewhunt Logo" className="main-logo" />
        <h1>{t('not_found.header')}</h1>
        <p>{t('not_found.description')}</p>
        <Link to="/" className="round-border padded-button">
          <Button size="large" ghost={true} className="round-border padded-button">Take Me Home</Button>
        </Link>
      </div>
    </div>
  )
};

export default NotFound;
