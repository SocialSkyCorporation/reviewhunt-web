import React from "react";
import { Icon } from "antd";
import PropTypes from "prop-types";

const SimpleButton = props => {
	const {
		onMouseOver,
		onMouseOut,
		onClick,
		text,
		style,
		icon,
		className,
		loading,
		inverse
	} = props;

	const inverseStyle = inverse
		? { backgroundColor: "black", color: "white" }
		: {};

	return (
		<div
			onMouseOver={onMouseOver}
			onMouseOut={onMouseOut}
			className={`simple-button ${className}`}
			onClick={onClick}
			style={{...inverseStyle, ...style}}
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
	className: "",
	style: {},
	onMouseOver: () => {},
	onmMouseOut: () => {},
	loading: false,
	inverse: false
};
export default SimpleButton;
