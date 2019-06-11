import React, { Component } from "react";
import FancyCanvas from "components/FancyCanvas";
import RHLogo from "assets/images/logo-circle-gradient.svg";
import HunterSignup from "./HunterSignup";
import MakerSignup from "./MakerSignup";
import LoginForm from "./LoginForm";
import Onboarding from "./Onboarding";
import { withTranslation, Trans } from "react-i18next";

const TAB_HUNTER = 0;
const TAB_MAKER = 1;

const STATUS_SIGNUP = 0;
const STATUS_LOGIN = 1;
const STATUS_ONBOARDING = 2;

class Auth extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tabIndex: TAB_HUNTER,
			status: STATUS_SIGNUP
		};
	}

	renderInputs() {
		const { tabIndex, status } = this.state;
		const { t } = this.props;
		const triggerCanvas = () => this.canvas.randomSplat();
		const onHunterTab = tabIndex === TAB_HUNTER;
		const onMakerTab = tabIndex === TAB_MAKER;
		const buttonText =
			(status === STATUS_SIGNUP && onHunterTab && t("auth.signup_hunter")) ||
			(status === STATUS_SIGNUP && !onHunterTab && t("auth.signup_maker")) ||
			(status === STATUS_LOGIN && t("login").toUpperCase());
		// const onClick = status === STATUS_SIGNUP ? () => {} : () => {};

		// handle signin

		return (
			<div className="input-container">
				{status === STATUS_SIGNUP && onHunterTab && (
					<HunterSignup triggerCanvas={triggerCanvas} />
				)}
				{status === STATUS_SIGNUP && onMakerTab && (
					<MakerSignup triggerCanvas={triggerCanvas} />
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

export default withTranslation()(Auth);
