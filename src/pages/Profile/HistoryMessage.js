import React from "react";
import PropTypes from "prop-types";
import Linkify from "react-linkify";

import starFilledImg from "assets/images/star-filled.svg";
import starHalfFilledImg from "assets/images/star-half-filled.svg";
import starEmptyImg from "assets/images/star-empty.svg";
import moneyImg from "assets/images/money-green.svg";
import paidImg from "assets/images/dispenser-green.svg";
import checkImg from "assets/images/check-green.svg";
import rejectImg from "assets/images/reject.svg";
import pendingImg from "assets/images/pending.svg";

const MAX_STARS = 5;

const HistoryMessage = ({ type, status, rating, containerStyle }) => {

	let img = "";
	let message = "";

	if(!status) {
		return null;
	}

	if (status === "approved") {
		img = <img src={checkImg} alt="" />;
		message = "Your submission was confirmed. You will earn x HUNT after this campaign is all finished";
	} else if (status === "rejected") {
		img = <img src={rejectImg} alt="" />;
		message = "Your submission - [URL] was not approved (if you want to appeal, use #reviewhunt-appeal channel in our Discord group (https://discord.gg/84zsT4m).";
	} else if (status === "bounty_paid") {
		img = <img src={moneyImg} alt="" />;
		message = "1,506 HUNT has been distributed to your wallet from your submission - [URL]."
	} else if (status === "submitted") {
		img = <img src={pendingImg} alt="" />;
		message = "Your content - [URL] was submitted, and it’s waiting for moderation."
	} else if (status === "star") {
		const numFilledStars = rating / 2;
		const hasHalfStar = !Number.isInteger(numFilledStars);

		const filledStars = [...new Array(Math.floor(numFilledStars))].map(
			(item, index) => <img key={index} src={starFilledImg} alt="" />
		);

		const emptyStars = [
			...new Array(MAX_STARS - Math.ceil(numFilledStars))
		].map((item, index) => <img key={index} src={starEmptyImg} alt="" />);

		img = (
			<div className="row-align-start">
				{filledStars}
				{hasHalfStar && <img src={starHalfFilledImg} alt=""/>}
				{emptyStars}
			</div>
		);
	}

	return (
		<div
			className="row-align-start history-message-item"
			style={containerStyle}
		>
			{img}
			<div className="text-black message-text">
				<Linkify>{message}</Linkify>
			</div>
		</div>
	);
};

HistoryMessage.propTypes = {
	status: PropTypes.string,
	message: PropTypes.string,
	containerStyle: PropTypes.object,
	rating: PropTypes.number
};

export default HistoryMessage;
