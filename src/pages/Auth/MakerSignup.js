import React, { useState, useContext } from "react";
import { Input, Select } from "antd";
import PropTypes from "prop-types";
import { useTranslation, Trans } from "react-i18next";
import { validateForm } from "utils/helpers/formValidator";
import { businessCategories } from "utils/constants";
import AuthContext from "contexts/AuthContext";

const { Option } = Select;

const MakerSignup = ({ triggerCanvas }) => {
	const [errorMessage, setErrorMessage] = useState(null);
	const { t } = useTranslation();
	const ctx = useContext(AuthContext);
	const { setFormData, formData } = ctx;

	const handleSubmit = e => {
		e.preventDefault();
		const errors = validateForm(formData, [
			"nameOfCompany",
			"fullName",
			"emailAddress",
			"password",
			"confirmPassword",
			"businessCategory"
		]);

		if (!errors) {
			console.log("no errors");
			setErrorMessage(null);

			//make an api call
		} else {
			setErrorMessage(
				errors.map((e, i) => {
					return (
						<div key={i}>
							{e}
							<br />
						</div>
					);
				})
			);
		}
	};

	return (
		<>
			<Input
				className="auth-form-input"
				placeholder={t("company")}
				value={formData.nameOfCompany}
				onChange={e => {
					const nameOfCompany = e.nativeEvent.target.value;
					setFormData({ ...formData, nameOfCompany });
					triggerCanvas();
				}}
			/>
			<Input
				className="auth-form-input"
				placeholder={t("full_name")}
				value={formData.fullName}
				onChange={e => {
					const fullName = e.nativeEvent.target.value;
					setFormData({ ...formData, fullName });
					triggerCanvas();
				}}
			/>
			<Input
				className="auth-form-input"
				placeholder={t("email")}
				value={formData.emailAddress}
				onChange={e => {
					const emailAddress = e.nativeEvent.target.value;
					setFormData({ ...formData, emailAddress });
					triggerCanvas();
				}}
			/>
			<Input.Password
				className="auth-form-input"
				placeholder={t("password")}
				value={formData.password}
				onChange={e => {
					const password = e.nativeEvent.target.value;
					setFormData({ ...formData, password });
					triggerCanvas();
				}}
			/>
			<Input.Password
				className="auth-form-input"
				placeholder={t("confirm_password")}
				value={formData.confirmPassword}
				onChange={e => {
					const confirmPassword = e.nativeEvent.target.value;
					setFormData({ ...formData, confirmPassword });
					triggerCanvas();
				}}
			/>
			<Select
				placeholder={t("business_category")}
				value={formData.businessCategory}
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
			{errorMessage && (
				<div className="text-warning error-message">{errorMessage}</div>
			)}
			}
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
