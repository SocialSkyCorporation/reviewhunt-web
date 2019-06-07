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

const MAX_STARS = 5;

const HistoryMessage = ({ type, rating, message, containerStyle }) => {
	let img = "";

	if (type === "confirm") {
		img = <img src={checkImg} alt="" />;
	} else if (type === "reject") {
		img = <img src={rejectImg} alt="" />;
	} else if (type === "earned") {
		img = <img src={moneyImg} alt="" />;
	} else if (type === "paid") {
		img = <img src={paidImg} alt="" />;
	} else if (type === "star") {
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
	type: PropTypes.string,
	message: PropTypes.string,
	containerStyle: PropTypes.object,
	rating: PropTypes.number
};

export default HistoryMessage;
