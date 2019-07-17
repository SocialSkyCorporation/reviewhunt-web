import React, { useState, useContext } from "react";
import { Avatar, Input, Select, Icon, notification } from "antd";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import steemLogo from "assets/images/steem-logo.svg";
import steemLogoBlack from "assets/images/steem-logo-bk.svg";
import { getLoginURL } from "utils/token";
import AuthContext from "contexts/AuthContext.js";
import { useTranslation } from "react-i18next";
import { isWebUri } from "valid-url";

import youtubeIcon from "assets/images/youtube-grey.svg";
import instagramIcon from "assets/images/instagram-grey.svg";
import twitterIcon from "assets/images/twitter-grey.svg";
import steemIcon from "assets/images/steem-grey.svg";
import redditIcon from "assets/images/reddit-grey.svg";
import twitchIcon from "assets/images/twitch-grey.svg";
import mediumIcon from "assets/images/medium-grey.svg";
import otherIcon from "assets/images/other-grey.svg";
import approvedIcon from "assets/images/approved.svg";
import deleteIcon from "assets/images/delete.svg";

const { Option } = Select;

const ChannelItem = props => {
	const { icon, verified } = props;

	return (
		<div className="buzz-channel-item col-on-mobile row-align-start">
			<div className="row-align-center buzz-channel-container">
				<div className="buzz-icon-container">
					<img className="buzz-channel-icon" src={icon} alt="" />
					{verified && (
						<img
							className="overlapped-approved-icon"
							src={approvedIcon}
							alt=""
						/>
					)}
				</div>
				<div className="buzz-channel-text text-grey">Instagram</div>
			</div>

			<div className="buzz-summary">
				<div className="row-align-center">
					<div className="buzz-link">
						<a target="__blank">https://www.instagram.com/andrew___cho</a>
					</div>
					<img className="buzz-delete-icon" src={deleteIcon} alt="" />
				</div>

				<div className="buzz-stat-container text-small text-grey">
					{verified && (
						<div className="row-align-center">
							<img src={approvedIcon} alt="" />
							<div className="approved-text">Verified channel</div>
						</div>
					)}
					Followers: 12,450
					<br />
					Total number of posts: 105
					<br />
					Average likes: 105.2
					<br />
					Average comments: 15.6
					<br />
					<span>Earning per post (estimation): 1.5K HUNT ($10.5)</span>
				</div>
			</div>
		</div>
	);
};

const Onboarding = ({ triggerCanvas, history }) => {
	const [selectValue, setSelectValue] = useState("channels");
	const [urlInput, setUrlInput] = useState("");
	const { t } = useTranslation();
	const {
		steemMe,
		steemconnectLoading,
		socialChannels,
		deleteSocialItem,
		setSocialChannels,
		name
	} = useContext(AuthContext);

	const persistState = {
		socialChannels
	};

	return (
		<div>
			<div className="onboarding-container grey-border">
				<div className="onboarding-header text-white uppercase">
					<div className="onboarding-header-text">
						Register your soical or community channels
					</div>

					<div className="text-grey">
						Add your social or community channels below with the URL of your
						page. Once you join in a quest and submit your review content later
						on, we will verify your social channel automatically.
					</div>
				</div>

				<div className="divider" />

				<div className="onboarding-content">
					<div className="channel-add-container row-space-between">
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
									<div
										onClick={() => {
											if (selectValue === "channels" || urlInput === "") return;
											else if (!isWebUri(urlInput)) {
												notification["error"]({
													message:
														"Please enter a valid url beginning with http:// or https://."
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
									>
										Submit
									</div>
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

					{socialChannels.map((s, i) => (
						<ChannelItem
							key={i}
							onDeleteClicked={() => {
								deleteSocialItem(i);
							}}
							index={i}
							data={s}
							triggerCanvas={triggerCanvas}
						/>
					))}

					<ChannelItem icon={instagramIcon} />
					<ChannelItem icon={youtubeIcon} />
					<ChannelItem icon={instagramIcon} />
					<ChannelItem icon={instagramIcon} />

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
};

Onboarding.propTypes = {
	triggerCanvas: PropTypes.func
};

export default withRouter(Onboarding);
