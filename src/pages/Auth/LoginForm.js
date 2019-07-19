import React from "react";
import { Input } from "antd";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import {
  OptimizedInput,
  OptimizedInputPassword
} from "./OptimizedFormTypes";


const LoginForm = ({
  triggerCanvas,
  emailAddress,
  password,
  setFormData,
  handleSubmit
}) => {
  const { t } = useTranslation();

  return (
    <form>
      <OptimizedInput
        className="auth-form-input"
        placeholder={t("email")}
        autoComplete="username"
        onChange={e => {
          setFormData("emailAddress", e.target.value);
          triggerCanvas();
        }}
        value={emailAddress}
      />
      <OptimizedInputPassword
        className="auth-form-input"
        placeholder={t("password")}
        autoComplete="current_password"
        onChange={e => {
          setFormData("password", e.target.value);
          triggerCanvas();
        }}
        value={password}
      />
      <div
        className="simple-button gradient-button primary-gradient"
        onClick={handleSubmit}
      >
        {t("login")}
      </div>
    </form>
  );
};

LoginForm.propTypes = {
  triggerCanvas: PropTypes.func
};

export default LoginForm;
