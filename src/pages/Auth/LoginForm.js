import React from "react";
import { Form, Input } from "antd";
import PropTypes from "prop-types";
import { AuthConsumer } from "contexts/AuthContext";
import { useTranslation } from "react-i18next";

const LoginForm = ({ triggerCanvas }) => {
  const { t } = useTranslation();

  const handleSubmit = e => {
    e.preventDefault();
    console.log("clicked submit")
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        className="auth-form-input"
        placeholder={t("email")}
        onChange={triggerCanvas}
      />
      <Input.Password
        className="auth-form-input"
        placeholder={t("password")}
        onChange={triggerCanvas}
      />
      <div className="simple-button gradient-button primary-gradient">
        {t("login")}
      </div>
    </Form>
  );
};

LoginForm.propTypes = {};

export default LoginForm;
