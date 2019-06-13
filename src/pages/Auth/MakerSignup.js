import React from "react";
import { Input, Select } from "antd";
import PropTypes from "prop-types";
import { useTranslation, Trans } from "react-i18next";
import { businessCategories } from "utils/constants";

const { Option } = Select;

const MakerSignup = ({
	triggerCanvas,
	setFormData,
	handleSubmit,
	nameOfCompany,
	fullName,
	emailAddress,
	password,
	confirmPassword,
	businessCategory
}) => {
	const { t } = useTranslation();

	return (
		<>
			<Input
				className="auth-form-input"
				placeholder={t("company")}
				value={nameOfCompany}
				onChange={e => {
					const nameOfCompany = e.nativeEvent.target.value;
					setFormData("nameOfCompany", nameOfCompany);
					triggerCanvas();
				}}
			/>
			<Input
				className="auth-form-input"
				placeholder={t("full_name")}
				value={fullName}
				onChange={e => {
					const fullName = e.nativeEvent.target.value;
					setFormData("fullName", fullName);
					triggerCanvas();
				}}
			/>
			<Input
				className="auth-form-input"
				placeholder={t("email")}
				value={emailAddress}
				onChange={e => {
					const emailAddress = e.nativeEvent.target.value;
					setFormData("emailAddress", emailAddress);
					triggerCanvas();
				}}
			/>
			<Input.Password
				className="auth-form-input"
				placeholder={t("password")}
				value={password}
				onChange={e => {
					const password = e.nativeEvent.target.value;
					setFormData("password", password);
					triggerCanvas();
				}}
			/>
			<Input.Password
				className="auth-form-input"
				placeholder={t("confirm_password")}
				value={confirmPassword}
				onChange={e => {
					const confirmPassword = e.nativeEvent.target.value;
					setFormData("confirmPassword", confirmPassword);
					triggerCanvas();
				}}
			/>
			<Select
				placeholder={t("business_category")}
				value={businessCategory}
				onChange={businessCategory =>
					setFormData("businessCategory", businessCategory)
				}
			>
				{businessCategories.map((b, i) => (
					<Option key={i} value={b}>
						{b}
					</Option>
				))}
			</Select>
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
				{t("auth.signup_maker")}
			</div>
		</>
	);
};

MakerSignup.propTypes = {};

export default MakerSignup;
