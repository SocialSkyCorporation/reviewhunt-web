import React from "react";
import PropTypes from "prop-types";

const SimpleButton = props => {
	const {onMouseOver, onMouseOut, onClick, text, style, icon, className } = props;

	return (
		<div 
		onMouseOver={onMouseOver}
		onMouseOut={onMouseOut}
		className={`simple-button ${className}`} onClick={onClick} style={style}>
			<div className="row-align-center simple-button-text">
				{icon}
				{text}
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
};
export default SimpleButton;
