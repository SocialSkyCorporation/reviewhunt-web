import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Input, Select } from "antd";
import { useTranslation, Trans } from "react-i18next";
import { days, monthsShort, countries, years, genders } from "utils/constants";
import { validateForm } from "utils/helpers/formValidator";
import AuthContext from "contexts/AuthContext";

const { Option } = Select;

const HunterSignup = ({ triggerCanvas }) => {
	const [errorMessage, setErrorMessage] = useState(null);
	const { t } = useTranslation();
	const ctx = useContext(AuthContext);
	const { setFormData, formData } = ctx;

	const handleSubmit = e => {
		e.preventDefault();
		const errors = validateForm(formData, [
			"fullName",
			"emailAddress",
			"password",
			"confirmPassword",
			"countryOfResidence",
			"gender",
			"month",
			"day",
			"year"
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
			<div>
				<div className="form-section-title text-grey">
					{t("auth.general_information")}
				</div>

				<Select
					onChange={countryOfResidence =>
						setFormData({ ...formData, countryOfResidence })
					}
					value={formData.countryOfResidence}
				>
					{countries.map((c, i) => (
						<Option key={i} value={c}>
							{c}
						</Option>
					))}
				</Select>
				<Select
					onChange={gender => setFormData({ ...formData, gender })}
					value={formData.gender}
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
						onChange={month => setFormData({ ...formData, month })}
						value={formData.month}
						className="select-dropdown"
					>
						{monthsShort.map((m, i) => (
							<Option key={i} value={m}>
								{m}
							</Option>
						))}
					</Select>
					<Select
						onChange={day => setFormData({ ...formData, day })}
						value={formData.day}
						className="select-dropdown"
					>
						{days.map((d, i) => (
							<Option key={i} value={d}>
								{d}
							</Option>
						))}
					</Select>
					<Select
						onChange={year => setFormData({ ...formData, year })}
						value={formData.year}
						className="select-dropdown"
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
			{errorMessage && (
				<div className="text-warning error-message">{errorMessage}</div>
			)}
			}
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
