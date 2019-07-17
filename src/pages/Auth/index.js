import React, { Component } from "react";
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
import {
	STATUS_SIGNUP,
	STATUS_LOGIN,
	STATUS_ONBOARDING
} from "contexts/AuthContext";
import CircularProgress from "components/CircularProgress";

const TAB_HUNTER = 0;
const TAB_MAKER = 1;

export const TYPE_HUNTER = "HUNTER";
export const TYPE_MAKER = "MAKER";

class Auth extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tabIndex: TAB_HUNTER,
			nameOfCompany: "",
			fullName: "sung woo park",
			emailAddress: "abcdefgh@mail.com",
			password: "swp123456",
			confirmPassword: "swp123456",
			countryOfResidence: "Country Of Residence",
			gender: "Gender",
			year: "Year",
			businessCategory: "Business Category"
		};
	}

	componentWillMount() {
		const { emailMe } = this.props.authContext;
		if (emailMe) this.props.history.replace("/");
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
		const { handleSignup } = this.props.authContext;
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
				handleSignup(TYPE_HUNTER, formData);
			} else if (onMakerTab) {
				handleSignup(TYPE_MAKER, formData);
			}
		} else {
			errors.forEach(e => {
				notification["error"]({
					message: e
				});
			});
		}
	};

	handleLogin = () => {
		const { tabIndex, emailAddress, password } = this.state;
		const { handleLogin } = this.props.authContext;
		const onHunterTab = tabIndex === TAB_HUNTER;
		const onMakerTab = tabIndex === TAB_MAKER;

		let formData = { email: emailAddress, password };
		const errors = validateForm(formData);

		if (!errors) {
			if (onHunterTab) {
				handleLogin(TYPE_HUNTER, formData);
			} else if (onMakerTab) {
				handleLogin(TYPE_MAKER, formData);
			}
		} else {
			errors.forEach(e => {
				notification["error"]({
					message: e
				});
			});
		}
	};

	renderInputs() {
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

		const { loading, status } = this.props.authContext;

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
						loading={loading}
						{...formData}
					/>
				)}
				{status === STATUS_SIGNUP && onMakerTab && (
					<MakerSignup
						triggerCanvas={triggerCanvas}
						setFormData={this.setFormData}
						handleSubmit={this.handleSignup}
						loading={loading}
						{...formData}
					/>
				)}
				{status === STATUS_LOGIN && (
					<LoginForm
						triggerCanvas={triggerCanvas}
						setFormData={this.setFormData}
						handleSubmit={this.handleLogin}
						{...formData}
					/>
				)}
			</div>
		);
	}

	renderAccountText() {
		const { t } = this.props;
		const { status, setStatus } = this.props.authContext;
		const hintText =
			status === STATUS_SIGNUP
				? t("auth.account_exists")
				: t("auth.no_account");
		const buttonText = status === STATUS_SIGNUP ? t("login") : t("signup");
		const onClick =
			status === STATUS_SIGNUP
				? () => setStatus(STATUS_LOGIN)
				: () => setStatus(STATUS_SIGNUP);


		return (
			<div className="login-button-container grey-border">
				<div className="text-grey">
					{hintText}
					<b className="text-blue hover-link" onClick={onClick}>
						{buttonText}
					</b>
				</div>
			</div>
		);
	}

	render() {
		const { tabIndex } = this.state;
		const { t } = this.props;
		const { status, setStatus, loading, authenticating, emailMe } = this.props.authContext;
		const onHunterTab = tabIndex === TAB_HUNTER;

		const triggerCanvas = () => this.canvas.randomSplat();

		if(status === STATUS_ONBOARDING && !emailMe) {
			setStatus(STATUS_LOGIN);
			return null;
		}

		const title =
			(status === STATUS_ONBOARDING && (
				<Trans i18nKey="auth.welcome">Welcome {emailMe.name}!</Trans>
			)) ||
			(status === STATUS_SIGNUP && onHunterTab
				? t("auth.join_hunter")
				: t("auth.join_maker")) ||
			(status === STATUS_LOGIN && t("auth.welcome_back"));

		const description =
			(status === STATUS_ONBOARDING && t("auth.onboarding_desc")) ||
			(status === STATUS_SIGNUP && onHunterTab && t("auth.hunter_desc")) ||
			(status === STATUS_SIGNUP && !onHunterTab && t("auth.maker_desc"));

		if (authenticating) return <CircularProgress />;

		return (
			<div>
				<FancyCanvas ref={v => (this.canvas = v)} />
				<div className="auth-page">
					<a href="/">
						<img className="rh-logo" src={RHLogo} alt="" />
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
										onClick={() => {
											if (loading) return;
											this.setState({ tabIndex: 0 });
										}}
									>
										{t("auth.hunter")}
									</div>
									<div
										className="tab-item text-off-white"
										style={{
											opacity: onHunterTab ? 0.5 : 1
										}}
										onClick={() => {
											if (loading) return;
											this.setState({ tabIndex: 1 });
										}}
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
					<>
						{status === STATUS_ONBOARDING && <Onboarding triggerCanvas={triggerCanvas} />}
						</>
					)}
					{status !== STATUS_ONBOARDING && this.renderAccountText()}
				</div>
			</div>
		);
	}
}

export default withTranslation()(withAuthContext(Auth));
