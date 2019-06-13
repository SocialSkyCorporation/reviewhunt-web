import React, { Component, useContext } from "react";
import { notification } from "antd";
import FancyCanvas from "components/FancyCanvas";
import RHLogo from "assets/images/logo-circle-gradient.svg";
import HunterSignup from "./HunterSignup";
import MakerSignup from "./MakerSignup";
import LoginForm from "./LoginForm";
import Onboarding from "./Onboarding";
import { withTranslation, Trans } from "react-i18next";
import { validateForm } from "utils/helpers/formValidator";
import { withAuthContext } from "contexts/HOC";

const TAB_HUNTER = 0;
const TAB_MAKER = 1;

const STATUS_SIGNUP = 0;
const STATUS_LOGIN = 1;
const STATUS_ONBOARDING = 2;

export const TYPE_HUNTER = "HUNTER";
export const TYPE_MAKER = "MAKER";

class Auth extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tabIndex: TAB_HUNTER,
			status: STATUS_SIGNUP,
			nameOfCompany: "",
			fullName: "abcasef",
			emailAddress: "abc@mail.com",
			password: "12345567123",
			confirmPassword: "12345567123",
			countryOfResidence: "Country Of Residence",
			gender: "Gender",
			year: "Year",
			businessCategory: "Business Category"
		};
	}

	setFormData = (key, value) => {
		this.setState({ [key]: value });
	};

	handleSignup = () => {
		const {
			tabIndex,
			nameOfCompany,
			fullName,
			emailAddress,
			password,
			confirmPassword,
			countryOfResidence,
			gender,
			year,
			businessCategory
		} = this.state;
		// var userLang = navigator.language || navigator.userLanguage;
		// alert ("The language is: " + userLang);
		const onHunterTab = tabIndex === TAB_HUNTER;
		const onMakerTab = tabIndex === TAB_MAKER;

		let formData = {};

		if (onHunterTab) {
			formData = {
				fullName,
				emailAddress,
				password,
				confirmPassword,
				countryOfResidence,
				gender,
				year
			};
		} else if (onMakerTab) {
			formData = {
				nameOfCompany,
				fullName,
				emailAddress,
				password,
				confirmPassword,
				businessCategory
			};
		}

		const errors = validateForm(formData);

		if (!errors) {
			if (onHunterTab) {
				this.props.context.handleSignup(TYPE_HUNTER, formData);
			} else if (onMakerTab) {
				this.props.context.handleSignup(TYPE_MAKER, formData);
			}
		} else {
			errors.map(e => {
				notification.error({
					message: "Missing Required Input Field",
					description: e,
					onClick: () => {}
				});
			});
		}
	};

	handleLogin = () => {};

	renderInputs() {
		const {
			tabIndex,
			status,
			nameOfCompany,
			fullName,
			emailAddress,
			password,
			confirmPassword,
			countryOfResidence,
			gender,
			year,
			businessCategory
		} = this.state;
		const triggerCanvas = () => this.canvas.randomSplat();
		const onHunterTab = tabIndex === TAB_HUNTER;
		const onMakerTab = tabIndex === TAB_MAKER;

		const formData = {
			nameOfCompany,
			fullName,
			emailAddress,
			password,
			confirmPassword,
			countryOfResidence,
			gender,
			year,
			businessCategory
		};

		return (
			<div className="input-container">
				{status === STATUS_SIGNUP && onHunterTab && (
					<HunterSignup
						triggerCanvas={triggerCanvas}
						setFormData={this.setFormData}
						handleSubmit={this.handleSignup}
						{...formData}
					/>
				)}
				{status === STATUS_SIGNUP && onMakerTab && (
					<MakerSignup
						triggerCanvas={triggerCanvas}
						setFormData={this.setFormData}
						handleSubmit={this.handleSignup}
						{...formData}
					/>
				)}
				{status === STATUS_LOGIN && <LoginForm triggerCanvas={triggerCanvas} />}
			</div>
		);
	}

	renderAccountText() {
		const { status } = this.state;
		const { t } = this.props;
		const hintText =
			status === STATUS_SIGNUP
				? t("auth.account_exists")
				: t("auth.no_account");
		const buttonText = status === STATUS_SIGNUP ? t("login") : t("signup");
		const onClick =
			status === STATUS_SIGNUP
				? () => this.setState({ status: STATUS_LOGIN })
				: () => this.setState({ status: STATUS_SIGNUP });

		return (
			<div className="login-button-container grey-border">
				<div className="text-grey">
					{hintText}
					<span className="text-blue hover-link" onClick={onClick}>
						{buttonText}
					</span>
				</div>
			</div>
		);
	}

	render() {
		const { tabIndex, status } = this.state;
		const { t } = this.props;
		const onHunterTab = tabIndex === TAB_HUNTER;
		const name = "YoungHwi Cho";
		const triggerCanvas = () => this.canvas.randomSplat();
		const title =
			(status === STATUS_ONBOARDING && (
				<Trans i18nKey="auth.welcome">Welcome {{ name }}!</Trans>
			)) ||
			(status === STATUS_SIGNUP && onHunterTab
				? t("auth.join_hunter")
				: t("auth.join_maker")) ||
			(status === STATUS_LOGIN && t("auth.welcome_back"));

		const description =
			(status === STATUS_ONBOARDING && t("auth.onboarding_desc")) ||
			(status === STATUS_SIGNUP && onHunterTab && t("auth.hunter_desc")) ||
			(status === STATUS_SIGNUP && !onHunterTab && t("auth.maker_desc"));

		return (
			<div>
				<FancyCanvas ref={v => (this.canvas = v)} />
				<div className="auth-page">
					<a href="/">
						<img src={RHLogo} alt="" />
					</a>
					<div className="join-text text-off-white">{title}</div>
					<div
						className={`description-text ${status === STATUS_ONBOARDING &&
							"onboarding"} text-grey`}
					>
						{description}
					</div>
					{status !== STATUS_ONBOARDING ? (
						<div className="form-container grey-border">
							<div className="tab-container">
								<div className="tab-item-container">
									<div
										className="tab-item text-off-white"
										style={{
											opacity: onHunterTab ? 1 : 0.5
										}}
										onClick={() => this.setState({ tabIndex: 0 })}
									>
										{t("auth.hunter")}
									</div>
									<div
										className="tab-item text-off-white"
										style={{
											opacity: onHunterTab ? 0.5 : 1
										}}
										onClick={() => this.setState({ tabIndex: 1 })}
									>
										{t("auth.maker")}
									</div>
								</div>
								<div className="tab-highlight-container">
									<div className="tab-highlight-gray" />
									<div
										className="tab-highlight primary-gradient"
										style={{
											left: onHunterTab ? "0%" : "50%"
										}}
									/>
								</div>
							</div>
							{this.renderInputs()}
						</div>
					) : (
						<Onboarding triggerCanvas={triggerCanvas} />
					)}
					{status !== STATUS_ONBOARDING && this.renderAccountText()}
				</div>
			</div>
		);
	}
}

export default withTranslation()(withAuthContext(Auth));
