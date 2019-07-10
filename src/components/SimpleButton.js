import React, { useState } from "react";
import { Icon } from "antd";
import PropTypes from "prop-types";

const SimpleButton = props => {
	const [hover, setHover] = useState(false);
	const {
		type,
		onMouseOver,
		onMouseOut,
		onClick,
		text,
		style,
		icon,
		className,
		loading,
		borderColor,
		inverse
	} = props;

	const buttonStyle = { borderColor, color: borderColor, ...style };

	const inverseStyle = inverse
		? { backgroundColor: borderColor, color: "#fff" }
		: {};

	const hoverStyle = hover
		? {
				backgroundColor: borderColor,
				color: "#fff"
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
			className={`simple-button ${type} ${className} ${inverse && "inverse"}`}
			onClick={onClick}
			style={{ ...buttonStyle, ...inverseStyle, ...hoverStyle }}
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
	borderColor: "#000"
};
export default SimpleButton;
