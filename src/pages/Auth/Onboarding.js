import React, { useState } from "react";
import { Avatar, Input, Select, Icon, notification } from "antd";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import steemLogo from "assets/images/steem-logo.svg";
import steemLogoBlack from "assets/images/steem-logo-bk.svg";
import { getLoginURL } from "utils/token";
import { AuthConsumer } from "contexts/AuthContext.js";
import { useTranslation } from "react-i18next";
import { isWebUri } from "valid-url";

const { Option } = Select;

const SocialRow = ({ triggerCanvas, data, onDeleteClicked }) => {
	const { t } = useTranslation();
	const { channel, url } = data;
	return (
		<div className="row-align-center onboarding-social-row">
			<div className="col-on-mobile">
				<div className="channel-text text-grey">{t(channel)}</div>
				<Input
					addonAfter={<Icon type="close" onClick={onDeleteClicked} />}
					placeholder={t("input_url")}
					className="delete-input text-grey"
					value={url}
					onChange={triggerCanvas}
					disabled
				/>
			</div>
		</div>
	);
};

const Onboarding = ({ triggerCanvas, history }) => {
	const [steemImg, setSteemImg] = useState(steemLogo);
	const [selectValue, setSelectValue] = useState("channels");
	const [urlInput, setUrlInput] = useState("");
	const { t } = useTranslation();

	return (
		<AuthConsumer>
			{({ me, steemconnectLoading, socialChannels, deleteSocialItem, setSocialChannels, name }) => {
				const persistState = {
					socialChannels
				};

				const steemNotConnected = connecting => (
					<div className="steem-connect-container onboarding-content">
						<div>
							<div className="text-white">{t("steem_steemhunt")}</div>
							<div className="text-grey">{t("connect_hint")}</div>
						</div>
						<a href={getLoginURL(persistState)}>
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
							<Avatar
                  src={`${process.env.REACT_APP_STEEMCONNECT_IMG_HOST}/@${me._id}?s=80`}
                  size="large"
                  className="profile-icon"
                />

							<div className="text-grey">{me.name}</div>
						</div>
						<div className="steem-connect-button">
							<div className="connect-text">{t("disconnect")}</div>
						</div>
					</div>
				);

				return (
					<div>
						<div className="onboarding-container grey-border">
							<div className="onboarding-header text-white">
								{t("connect_steem")}
							</div>
							{me ? steemConnected() : steemNotConnected(steemconnectLoading)}
						</div>

						<div className="onboarding-container grey-border">
							<div className="onboarding-header text-white">
								{t("register_social")}
							</div>
							<div className="onboarding-content">
								<div className="row-space-between">
									<div className="col-on-mobile">
										<Select
											value={t(selectValue)}
											className="select-channel delete"
											onChange={c => setSelectValue(c)}
										>
											<Option value="instagram">{t("instagram")}</Option>
											<Option value="twitter">{t("twitter")}</Option>
											<Option value="medium">{t("medium")}</Option>
											<Option value="reddit">{t("reddit")}</Option>
											<Option value="twitch">{t("twitch")}</Option>
											<Option value="youtube">{t("youtube")}</Option>
											<Option value="others">{t("others")}</Option>
										</Select>
										<Input
											addonAfter={
												<Icon
													type="plus"
													onClick={() => {
														if (selectValue === "channels" || urlInput === "")
															return;
														else if (!isWebUri(urlInput)) {
															notification["error"]({
																message: "Please enter a valid url beginning with http:// or https://."
															});
															return;
														}
														setSocialChannels(
															socialChannels.concat({
																channel: selectValue,
																url: urlInput
															})
														);

														setSelectValue("channels");
														setUrlInput("");
													}}
												/>
											}
											value={urlInput}
											placeholder={t("input_url")}
											onChange={e => {
												setUrlInput(e.target.value);
												triggerCanvas();
											}}
										/>
									</div>
								</div>

								<div className="divider" />

								{socialChannels.map((s, i) => (
									<SocialRow
										key={i}
										onDeleteClicked={() => {
											deleteSocialItem(i);
										}}
										index={i}
										data={s}
										triggerCanvas={triggerCanvas}
									/>
								))}

								<div
									className="simple-button gradient-button primary-gradient"
									onClick={() => {}}
								>
									{t("confirm").toUpperCase()}
								</div>

								<div
									className="skip-button text-blue hover-link"
									onClick={() => {
										history.push("/profile");
									}}
								>
									{t("skip").toUpperCase()}
								</div>
							</div>
						</div>
					</div>
				);
			}}
		</AuthConsumer>
	);
};

Onboarding.propTypes = {
	triggerCanvas: PropTypes.func
};

export default withRouter(Onboarding);
