import React from "react";
import PropTypes from "prop-types";
import { Input, Select } from "antd";

const HunterSignup = ({ className, triggerCanvas }) => {
	return (
		<>
			<Input
				className="auth-form-input"
				placeholder="Full name"
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

			<div>
				<div className="form-section-title text-grey">
					GENERAL INFORMATION
				</div>

				<Select placeholder="Country of Residence" />
				<Select placeholder="Gender" />
				<div className="form-section-title text-grey">
					DATE OF BIRTH
				</div>
				<div className="row-space-around">
					<Select className="select-dropdown" placeholder="Month" />
					<Select className="select-dropdown" placeholder="Day" />
					<Select className="select-dropdown" placeholder="Year" />
				</div>
			</div>
		</>
	);
};

HunterSignup.displayName = "HunterSignup";

HunterSignup.propTypes = {
	className: PropTypes.string
};

export default HunterSignup;
