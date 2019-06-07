import React from "react";
import { Input, Select } from "antd";
import PropTypes from 'prop-types';

const MakerSignup = ({ className, triggerCanvas }) => {
	return (
		<>
			<Input
				className="auth-form-input"
				placeholder="Name of company"
				onChange={triggerCanvas}
			/>
			<Input
				className="auth-form-input"
				placeholder="Your full name"
				onChange={triggerCanvas}
			/>
			<Input
				className="auth-form-input"
				placeholder="Email address"
				onChange={triggerCanvas}
			/>
			<Input.Password
				className="auth-form-input"
				placeholder="Password"
				onChange={triggerCanvas}
			/>
			<Input.Password
				className="auth-form-input"
				placeholder="Confirm password"
				onChange={triggerCanvas}
			/>
			<Select placeholder="Business category" />
		</>
	);
};

MakerSignup.displayName = "MakerSignup";

MakerSignup.propTypes = {
	className: PropTypes.string
};

export default MakerSignup;
