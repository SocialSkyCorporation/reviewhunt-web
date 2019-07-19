import React from "react";
import PropTypes from "prop-types";
import { Icon, Input, Select } from "antd";
import { useTranslation, Trans } from "react-i18next";
import { countries, years, genders } from "utils/constants";

import {
	OptimizedInput,
	OptimizedSelect,
	OptimizedInputPassword
} from "./OptimizedFormTypes";

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
		<form>
			<OptimizedInput
				className="auth-form-input"
				placeholder={t("full_name")}
				autoComplete="name"
				value={fullName}
				onChange={e => {
					const fullName = e.nativeEvent.target.value;
					setFormData("fullName", fullName);
					triggerCanvas();
				}}
				disabled={loading}
			/>
			<OptimizedInput
				className="auth-form-input"
				placeholder={t("email")}
				value={emailAddress}
				autoComplete="username"
				onChange={e => {
					const emailAddress = e.nativeEvent.target.value;
					setFormData("emailAddress", emailAddress);
					triggerCanvas();
				}}
				disabled={loading}
			/>
			<OptimizedInputPassword
				className="auth-form-input"
				placeholder={t("password")}
				value={password}
				autoComplete="new-password"
				onChange={e => {
					const password = e.nativeEvent.target.value;
					setFormData("password", password);
					triggerCanvas();
				}}
				disabled={loading}
			/>
			<OptimizedInputPassword
				className="auth-form-input"
				placeholder={t("confirm_password")}
				value={confirmPassword}
				autoComplete="new-password"
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

				<OptimizedSelect
					onChange={countryOfResidence =>
						setFormData("countryOfResidence", countryOfResidence)
					}
					autoComplete="country"
					value={countryOfResidence}
					disabled={loading}
				>
					{countries.map((c, i) => (
						<Option key={i} value={c.code}>
							{c.value}
						</Option>
					))}
				</OptimizedSelect>
				<OptimizedSelect
					onChange={gender => setFormData("gender", gender)}
					value={gender}
					disabled={loading}
					autoComplete="sex"
				>
					{genders.map((g, i) => (
						<Option key={i} value={g}>
							{g}
						</Option>
					))}
				</OptimizedSelect>
				<div className="form-section-title text-grey">{t("auth.dob")}</div>
				<div className="row-space-around">
					<OptimizedSelect
						onChange={year => setFormData("year", year)}
						value={year}
						disabled={loading}
						autoComplete="bday-year"
					>
						{years.map((y, i) => (
							<Option key={i} value={y}>
								{y}
							</Option>
						))}
					</OptimizedSelect>
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
		</form>
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
