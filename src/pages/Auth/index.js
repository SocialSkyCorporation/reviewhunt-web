import React, { Component } from "react";
import FancyCanvas from "components/FancyCanvas";
import RHLogo from "assets/images/logo-circle-gradient.svg";
import HunterSignup from "./HunterSignup";
import MakerSignup from "./MakerSignup";
import LoginForm from "./LoginForm";
import Onboarding from "./Onboarding";

const TAB_HUNTER = 0;
const TAB_MAKER = 1;

const STATUS_SIGNUP = 0;
const STATUS_LOGIN = 1;
const STATUS_ONBOARDING = 2;

export default class Login extends Component {
	state = {
		tabIndex: TAB_HUNTER,
		status: STATUS_SIGNUP
	};

	renderInputs() {
		const { tabIndex, status } = this.state;
		const triggerCanvas = () => this.canvas.randomSplat();
		const onHunterTab = tabIndex === TAB_HUNTER;
		const onMakerTab = tabIndex === TAB_MAKER;
		const buttonText =
			(status === STATUS_SIGNUP &&
				`SIGN UP AS ${onHunterTab ? "HUNTER" : "MAKER"}`) ||
			(status === STATUS_LOGIN && "LOGIN");
		// const onClick = status === STATUS_SIGNUP ? () => {} : () => {};

		// handle signin
		const onClick = () => this.setState({ status: STATUS_ONBOARDING });

		return (
			<div className="input-container">
				{status === STATUS_SIGNUP && onHunterTab && (
					<HunterSignup triggerCanvas={triggerCanvas} />
				)}
				{status === STATUS_SIGNUP && onMakerTab && (
					<MakerSignup triggerCanvas={triggerCanvas} />
				)}

				{status === STATUS_LOGIN && (
					<LoginForm triggerCanvas={triggerCanvas} />
				)}

				{status === STATUS_SIGNUP && (
					<div className="policy-agree-text text-grey">
						By signing up, you agree to our <a href="/">Terms</a>,{" "}
						<a href="/">Data Policy</a> and{" "}
						<a href="/">Cookies Policy</a>.
					</div>
				)}

				<div
					className="simple-button gradient-button primary-gradient"
					onClick={onClick}
				>
					{buttonText}
				</div>
			</div>
		);
	}

	renderLoginButton() {
		const { status } = this.state;
		const hintText =
			status === STATUS_SIGNUP
				? "Have an account? "
				: `Don't have an account? `;
		const buttonText = status === STATUS_SIGNUP ? "Log in" : `Sign up`;
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
		const onHunterTab = tabIndex === TAB_HUNTER;
		const triggerCanvas = () => this.canvas.randomSplat();
		const title =
			(status === STATUS_ONBOARDING && `Welcome YoungHwi Cho!`) ||
			(status === STATUS_SIGNUP && "Join as Maker") ||
			(status === STATUS_LOGIN && "Join as Hunter");

		const description =
			(status === STATUS_ONBOARDING &&
				"Reviewhunt connects you with cool new products that needs early attention by early-adopters like you. By joining fun quests and mission bounties, you can earn bounties. Connect your social accounts and maximise your quest and bounty chances.") ||
			(status === STATUS_SIGNUP &&
				onHunterTab &&
				"Are you a product maker who seeks early adopters? Reviewhunt will enable you to run review campaigns with unique quests and missions so that you can easily build a strong early user base and community exposure.") ||
			(status === STATUS_SIGNUP &&
				!onHunterTab &&
				"Are you interested in cool early tech products? Do you want to give a chance for them to have an early attention, and get paid? Join as a hunter and bring them for mass adoption.");

		return (
			<div>
				<FancyCanvas ref={v => (this.canvas = v)} />
				<div className="auth-page">
					<a href="/">
						<img src={RHLogo} alt="" />
					</a>
					<div className="join-text text-off-white">{title}</div>
					<div
						className={`description-text ${status ===
							STATUS_ONBOARDING && "onboarding"} text-grey`}
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
										onClick={() =>
											this.setState({ tabIndex: 0 })
										}
									>
										HUNTER
									</div>
									<div
										className="tab-item text-off-white"
										style={{
											opacity: onHunterTab ? 0.5 : 1
										}}
										onClick={() =>
											this.setState({ tabIndex: 1 })
										}
									>
										MAKER
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
					{status !== STATUS_ONBOARDING && this.renderLoginButton()}
				</div>
			</div>
		);
	}
}
