import React from "react";
import PropTypes from "prop-types";
import { Icon, Input, Select } from "antd";
import { useTranslation, Trans } from "react-i18next";
import { countries, years, genders } from "utils/constants";

const { Option } = Select;

const HunterSignup = ({
	triggerCanvas,
	fullName,
	emailAddress,
	password,
	confirmPassword,
	countryOfResidence,
	gender,
	year,
	setFormData,
	handleSubmit,
	loading
}) => {
	const { t } = useTranslation();

	return (
		<>
			<Input
				className="auth-form-input"
				placeholder={t("full_name")}
				value={fullName}
				onChange={e => {
					const fullName = e.nativeEvent.target.value;
					setFormData("fullName", fullName);
					triggerCanvas();
				}}
				disabled={loading}
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
				disabled={loading}
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
				disabled={loading}
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
				disabled={loading}
			/>
			<div>
				<div className="form-section-title text-grey">
					{t("auth.general_information")}
				</div>

				<Select
					onChange={countryOfResidence =>
						setFormData("countryOfResidence", countryOfResidence)
					}
					value={countryOfResidence}
					disabled={loading}
				>
					{countries.map((c, i) => (
						<Option key={i} value={c.code}>
							{c.value}
						</Option>
					))}
				</Select>
				<Select
					onChange={gender => setFormData("gender", gender)}
					value={gender}
					disabled={loading}
				>
					{genders.map((g, i) => (
						<Option key={i} value={g}>
							{g}
						</Option>
					))}
				</Select>
				<div className="form-section-title text-grey">{t("auth.dob")}</div>
				<div className="row-space-around">
					<Select
						onChange={year => setFormData("year", year)}
						value={year}
						disabled={loading}
					>
						{years.map((y, i) => (
							<Option key={i} value={y}>
								{y}
							</Option>
						))}
					</Select>
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
				onClick={() => {
					if (loading) return;
					handleSubmit();
				}}
			>
				{loading ? <Icon type="loading" /> : t("auth.signup_hunter")}
			</div>
		</>
	);
};

HunterSignup.propTypes = {
	triggerCanvas: PropTypes.func,
	setFormData: PropTypes.func,
	handleSubmit: PropTypes.func,
	nameOfCompany: PropTypes.string,
	fullName: PropTypes.string,
	emailAddress: PropTypes.string,
	password: PropTypes.string,
	countryOfResidence: PropTypes.string,
	gender: PropTypes.string,
	year: PropTypes.string,
	confirmPassword: PropTypes.string,
	businessCategory: PropTypes.string,
	loading: PropTypes.bool
};

export default HunterSignup;
