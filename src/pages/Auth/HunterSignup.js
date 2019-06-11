import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Form, Input, Select } from "antd";
import { useTranslation, Trans } from "react-i18next";

const HunterSignup = ({ triggerCanvas }) => {
	const { t } = useTranslation();

	const handleSubmit = e => {
		e.preventDefault();
	};

	return (
		<>
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

			<div>
				<div className="form-section-title text-grey">
					{t("auth.general_information")}
				</div>

				<Select placeholder={t("country")} />
				<Select placeholder={t("gender")} />
				<div className="form-section-title text-grey">{t("auth.dob")}</div>
				<div className="row-space-around">
					<Select className="select-dropdown" placeholder={t("auth.month")} />
					<Select className="select-dropdown" placeholder={t("auth.day")} />
					<Select className="select-dropdown" placeholder={t("auth.year")} />
				</div>
			</div>

			<div className="policy-agree-text text-grey">
				<Trans i18nKey="auth.agreement">
					By signing up, you agree to our
					<a href="/">Terms</a>, <a href="/">Data Policy</a>
					and <a href="/">Cookies Policy</a>.
				</Trans>
			</div>

			<div
				className="simple-button gradient-button primary-gradient"
				onClick={handleSubmit}
			>
				{t("auth.signup_hunter")}
			</div>
		</>
	);
};

HunterSignup.propTypes = {};

export default HunterSignup;
