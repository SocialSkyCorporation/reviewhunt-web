import React, { useState } from "react";
import { Input, Select, Icon } from "antd";
import PropTypes from "prop-types";
import steemLogo from "assets/images/steem-logo.svg";
import steemLogoBlack from "assets/images/steem-logo-bk.svg";
import { getLoginURL } from "utils/token";
import { AuthConsumer } from "contexts/AuthContext.js";
import { useTranslation } from "react-i18next";

const { Option } = Select;

const SocialRow = ({ triggerCanvas }) => {
	const { t } = useTranslation();
	return (
		<div className="row-align-center">
			<div className="col-on-mobile">
				<div className="channel-text text-grey">Instagram</div>
				<Input
					addonAfter={<Icon type="close" />}
					placeholder={t("input_url")}
					className="delete-input"
					onChange={triggerCanvas}
				/>
			</div>
		</div>
	);
};

const Onboarding = ({ triggerCanvas }) => {
	const [steemImg, setSteemImg] = useState(steemLogo);
	const { t } = useTranslation();

	const steemNotConnected = connecting => (
		<div className="steem-connect-container onboarding-content">
			<div>
				<div className="text-white">{t("steem_steemhunt")}</div>
				<div className="text-grey">{t("connect_hint")}</div>
			</div>
			<a href={getLoginURL()}>
				<div
					onMouseOver={() => setSteemImg(steemLogoBlack)}
					onMouseOut={() => setSteemImg(steemLogo)}
					className="steem-connect-button"
				>
					{connecting ? (
						<Icon type="sync" spin style={{ color: "#fff" }} />
					) : (
						<>
							<img className="steem-logo" src={steemImg} alt="" />
							<div>{t("connect").toUpperCase()}</div>
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
				<div className="connect-text">{t("disconnect")}</div>
			</div>
		</div>
	);

	return (
		<AuthConsumer>
			{({ me, steemconnectLoading }) => (
				<div>
					<div className="onboarding-container grey-border">
						<div className="onboarding-header text-white">
							{t("connect_steem")}
						</div>
						{me
							? steemConnected()
							: steemNotConnected(steemconnectLoading)}
					</div>

					<div className="onboarding-container grey-border">
						<div className="onboarding-header text-white">
							{t("register_social")}
						</div>
						<div className="onboarding-content">
							<div className="row-space-between">
								<div className="col-on-mobile">
									<Select
										defaultValue={t("channels")}
										className="select-channel delete"
									>
										<Option value="instagram">
											{t("instagram")}
										</Option>
										<Option value="twitter">
											{t("instagram")}
										</Option>
										<Option value="youtube">
											{t("instagram")}
										</Option>
										<Option value="medium">
											{t("instagram")}
										</Option>
									</Select>
									<Input
										addonAfter={<Icon type="plus" />}
										placeholder={t("input_url")}
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
								{t("confirm").toUpperCase()}
							</div>

							<div className="skip-button text-blue hover-link">
								{t("skip").toUpperCase()}
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
