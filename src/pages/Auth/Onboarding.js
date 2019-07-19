import React, { useState, useEffect, useContext, useMemo } from "react";
import { Avatar, Input, Select, Spin, Icon, notification } from "antd";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import steemLogo from "assets/images/steem-logo.svg";
import steemLogoBlack from "assets/images/steem-logo-bk.svg";
import { getLoginURL } from "utils/token";
import AuthContext from "contexts/AuthContext";
import AppContext from "contexts/AppContext";
import { useTranslation } from "react-i18next";
import { isWebUri } from "valid-url";
import { availableChannels } from "utils/constants";
import SimpleButton from "components/SimpleButton";
import approvedIcon from "assets/images/approved.svg";
import deleteIcon from "assets/images/delete.svg";
import { numberWithCommas } from "utils/helpers/numberFormatHelper";
import _ from "lodash";

const { Option } = Select;

function ChannelItem(props) {
	const { index, data, onDeleteClicked } = props;
	const { huntPerUsd } = useContext(AppContext);
	const {
		value,
		label,
		greyIcon,
		channel_type,
		url,
		name,
		user_name,
		profile_image,
		estimating,
		engagement_rate,
		follower_count,
		reward_estimation
	} = data;

	let huntReward = null;
	let usdReward = null;

	if (reward_estimation && !estimating) {
		huntReward = numberWithCommas(
			(parseFloat(reward_estimation) / huntPerUsd).toFixed(2)
		);
		usdReward = numberWithCommas(parseFloat(reward_estimation).toFixed(2));
	}

	return useMemo(() => {
		return (
			<div className="buzz-channel-item col-on-mobile row-align-start">
				<div className="row-align-center buzz-channel-container">
					<div className="buzz-icon-container">
						<img
							className="buzz-channel-icon"
							src={profile_image ? profile_image : greyIcon}
							alt=""
						/>
					</div>
					<div>
						<div className="buzz-channel-text text-grey">
							{channel_type || value}
						</div>
						<div className="buzz-channel-text text-white">
							{name || user_name}
						</div>
					</div>
				</div>

				<div className="buzz-summary">
					<div className="row-align-center">
						<div className="buzz-link">
							<a target="__blank">{url}</a>
						</div>
						{!estimating && (
							<img
								onClick={onDeleteClicked}
								className="buzz-delete-icon"
								src={deleteIcon}
								alt=""
							/>
						)}
					</div>

					<div className="buzz-stat-container text-small text-grey">
						<Spin spinning={estimating} tip="Estimating...">
							<div>
								Followers: {follower_count || 0}
								<br />
								Engagement Rate:{" "}
								{engagement_rate ? (engagement_rate * 100).toFixed(2) : 0}%
								<br />
								Earning per post (estimation):{" "}
								<span>
									{huntReward || 0} HUNT (${usdReward || 0})
								</span>
							</div>
						</Spin>
					</div>
				</div>
			</div>
		);
	}, [reward_estimation, huntPerUsd]);
}

const Onboarding = ({ triggerCanvas, history }) => {
	const [selectValue, setSelectValue] = useState("Channels");
	const [urlInput, setUrlInput] = useState("https://instagram.com/sebayaki");
	const { t } = useTranslation();
	const {
		steemMe,
		steemconnectLoading,
		socialChannels,
		saveSocialChannels,
		deleteSocialChannel,
		setSocialChannels,
		name
	} = useContext(AuthContext);

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
								value={selectValue}
								className="select-channel delete"
								onChange={c => setSelectValue(c)}
							>
								{availableChannels.map(({ label, value }, index) => {
									return (
										<Option key={value} value={value}>
											{label}
										</Option>
									);
								})}
							</Select>
							<Input
								addonAfter={
									<div
										onClick={() => {
											if (selectValue === "Channels" || urlInput === "") return;
											else if (!isWebUri(urlInput)) {
												notification["error"]({
													message:
														"Please enter a valid url beginning with http:// or https://."
												});
												return;
											}

											const value = _.find(availableChannels, [
												"key",
												selectValue
											]);

											setSocialChannels(
												socialChannels.concat({
													...value,
													url: urlInput,
													estimating: true
												})
											);

											setSelectValue("Channels");
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

					{socialChannels.map((data, i) => (
						<ChannelItem
							key={i}
							onDeleteClicked={() => {
								deleteSocialChannel(i);
							}}
							index={i}
							data={data}
							triggerCanvas={triggerCanvas}
						/>
					))}

					<SimpleButton
						className="simple-button gradient-button primary-gradient"
						onClick={() => {
							saveSocialChannels();
						}}
						hoverColor={"#50fdc6"}
						text={t("confirm").toUpperCase()}
					/>

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
