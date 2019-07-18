import React, { useState } from "react";
import { Icon } from "antd";
import PropTypes from "prop-types";

const SimpleButton = props => {
	const {
		type,
		onMouseOver,
		onMouseOut,
		onClick,
		text,
		borderColor,
		borderWidth,
		backgroundColor,
		hoverColor,
		hoverTextColor,
		color,
		style,
		icon,
		className,
		loading,
		inverse
	} = props;

	const [hover, setHover] = useState(false);
	const buttonStyle = {
		borderWidth,
		backgroundColor,
		borderColor,
		color,
		...style
	};

	const inverseStyle = inverse
		? { backgroundColor: color, color: backgroundColor }
		: {};

	const hoverStyle = hover
		? {
				backgroundColor: hoverColor,
				color: inverse ? backgroundColor : hoverTextColor, 
		  }
		: {};

	return (
		<div
			onMouseOver={e => {
				setHover(true);
				onMouseOver(e);
			}}
			onMouseOut={e => {
				setHover(false);
				onMouseOut(e);
			}}
			className={`simple-button ${type} ${className}`}
			onClick={onClick}
      style={{ ...buttonStyle, ...inverseStyle, ...hoverStyle, ...style }}
		>
			<div className="row-align-center simple-button-text">
				{icon}
				{loading ? <Icon type="loading" /> : text}
			</div>
		</div>
	);
};

SimpleButton.propTypes = {
	style: PropTypes.object
};

SimpleButton.defaultProps = {
	type: "primary",
	className: "",
	style: {},
	onMouseOver: () => {},
	onMouseOut: () => {},
	loading: false,
	inverse: false,
	borderColor: "#000",
	backgroundColor: "#fff",
	hoverColor: "#0a0a0a",
	hoverTextColor: "#fff",
	borderWidth: 1,
	color: "#000"
};
export default SimpleButton;
