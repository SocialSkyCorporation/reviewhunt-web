import React from "react";
import { Icon } from "antd";
import PropTypes from "prop-types";

const SimpleButton = props => {
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

	const buttonStyle = {...style, borderColor, color: borderColor};

	const inverseStyle = inverse
		? { backgroundColor: borderColor, color: "white" }
		: {};



	return (
		<div
			onMouseOver={onMouseOver}
			onMouseOut={onMouseOut}
			className={`simple-button ${type} ${className}`}
			onClick={onClick}
			style={{...buttonStyle, ...inverseStyle }}
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
	onmMouseOut: () => {},
	loading: false,
	inverse: false,
	borderColor: '#000'
};
export default SimpleButton;
