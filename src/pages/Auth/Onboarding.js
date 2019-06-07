import React, { useState } from "react";
import { Input, Select, Icon } from "antd";
import PropTypes from "prop-types";
import deleteImg from "assets/images/delete.svg";
import steemLogo from "assets/images/steem-logo.svg";
import steemLogoBlack from "assets/images/steem-logo-bk.svg";

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

const Onboarding = ({ className, triggerCanvas }) => {
	const [steemImg, setSteemImg] = useState(steemLogo);
	return (
		<div>
			<div className="onboarding-container grey-border">
				<div className="onboarding-header text-white">
					CONNECT WITH STEEMHUNT ACCOUNT
				</div>
				<div className="steem-connect-container onboarding-content">
					<div>
						<div className="text-white">STEEM (STEEMHUNT)</div>
						<div className="text-grey">
							Connect your Reviewhunt account to your Steemhunt
							(Steem) account for syncing the HUNT transactions.
						</div>
					</div>
					<div
						onMouseOver={() => setSteemImg(steemLogoBlack)}
						onMouseOut={() => setSteemImg(steemLogo)}
						className="steem-connect-button"
					>
						<img src={steemImg} alt="" />
						<div className="connect-text">CONNECT</div>
					</div>
				</div>
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
								<Option value="instagram">Instagram</Option>
								<Option value="twitter">Instagram</Option>
								<Option value="youtube">Instagram</Option>
								<Option value="medium">Instagram</Option>
							</Select>
							<Input
								addonAfter={<Icon type="plus"/>}
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
	);
};

Onboarding.displayName = "Onboarding";

Onboarding.propTypes = {
	className: PropTypes.string
};

export default Onboarding;
