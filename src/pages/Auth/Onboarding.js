import React, { useState } from "react";
import { Input, Select, Icon } from "antd";
import PropTypes from "prop-types";
import steemLogo from "assets/images/steem-logo.svg";
import steemLogoBlack from "assets/images/steem-logo-bk.svg";
import { getLoginURL } from "utils/token";
import { AuthConsumer } from "contexts/AuthContext.js";

const { Option } = Select;

const SocialRow = ({ triggerCanvas }) => (
	<div className="row-align-center">
		<div className="col-on-mobile">
			<div className="channel-text text-grey">Instagram</div>
			<Input
				addonAfter={<Icon type="close" />}
				placeholder="Input URL"
				className="delete-input"
				onChange={triggerCanvas}
			/>
		</div>
	</div>
);

const Onboarding = ({ triggerCanvas }) => {
	const [steemImg, setSteemImg] = useState(steemLogo);

	const steemNotConnected = connecting => (
		<div className="steem-connect-container onboarding-content">
			<div>
				<div className="text-white">STEEM (STEEMHUNT)</div>
				<div className="text-grey">
					Connect your Reviewhunt account to your Steemhunt (Steem)
					account for syncing the HUNT transactions.
				</div>
			</div>
			<a href={getLoginURL()}>
				<div
					onMouseOver={() => setSteemImg(steemLogoBlack)}
					onMouseOut={() => setSteemImg(steemLogo)}
					className="steem-connect-button"
				>
					{connecting ? (
						<Icon type="sync" spin style={{color: '#fff'}} />
					) : (
						<>
							<img className="steem-logo" src={steemImg} alt="" />
							<div>CONNECT</div>
						</>
					)}
				</div>
			</a>
		</div>
	);

	const steemConnected = () => (
		<div className="steem-connect-container onboarding-content row-space-between">
			<div className="row-align-center">
				<img
					className="profile-icon"
					src="https://picsum.photos/34"
					alt=""
				/>
				<div className="text-grey">@project7</div>
			</div>
			<div className="steem-connect-button">
				<div className="connect-text">DISCONNECT</div>
			</div>
		</div>
	);

	return (
		<AuthConsumer>
			{({ me, steemconnectLoading }) => (
				<div>
					<div className="onboarding-container grey-border">
						<div className="onboarding-header text-white">
							CONNECT WITH STEEMHUNT ACCOUNT
						</div>
						{me
							? steemConnected()
							: steemNotConnected(steemconnectLoading)}
					</div>

					<div className="onboarding-container grey-border">
						<div className="onboarding-header text-white">
							REGISTER YOUR SOCIAL CHANNELS
						</div>
						<div className="onboarding-content">
							<div className="row-space-between">
								<div className="col-on-mobile">
									<Select
										defaultValue={"Channels"}
										className="select-channel delete"
									>
										<Option value="instagram">
											Instagram
										</Option>
										<Option value="twitter">
											Instagram
										</Option>
										<Option value="youtube">
											Instagram
										</Option>
										<Option value="medium">
											Instagram
										</Option>
									</Select>
									<Input
										addonAfter={<Icon type="plus" />}
										placeholder="Input URL"
										onChange={triggerCanvas}
									/>
								</div>
							</div>

							<div className="divider" />

							<SocialRow triggerCanvas={triggerCanvas} />

							<div
								className="simple-button gradient-button primary-gradient"
								onClick={() => {}}
							>
								CONFIRM
							</div>

							<div className="skip-button text-blue hover-link">
								SKIP FOR NOW
							</div>
						</div>
					</div>
				</div>
			)}
		</AuthConsumer>
	);
};

Onboarding.propTypes = {};

export default Onboarding;
