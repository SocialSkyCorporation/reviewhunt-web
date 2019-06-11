import React from "react";
import {Form, Input, Select } from "antd";
import PropTypes from "prop-types";
import { useTranslation, Trans } from "react-i18next";

const MakerSignup = ({ triggerCanvas }) => {
	const { t } = useTranslation();
	return (
		<Form>
			<Input
				className="auth-form-input"
				placeholder={t("company")}
				onChange={triggerCanvas}
			/>
			<Input
				className="auth-form-input"
				placeholder={t("full_name")}
				onChange={triggerCanvas}
			/>
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
			<Input.Password
				className="auth-form-input"
				placeholder={t("confirm_password")}
				onChange={triggerCanvas}
			/>
			<Select placeholder={t("business_category")} />
			<div className="policy-agree-text text-grey">
				<Trans i18nKey="auth.agreement">
					By signing up, you agree to our
					<a href="/">Terms</a>, <a href="/">Data Policy</a>
					and <a href="/">Cookies Policy</a>.
				</Trans>
			</div>

			<div className="simple-button gradient-button primary-gradient">
				{t("auth.signup_maker")}
			</div>
		</Form>
	);
};

MakerSignup.propTypes = {};

export default MakerSignup;
