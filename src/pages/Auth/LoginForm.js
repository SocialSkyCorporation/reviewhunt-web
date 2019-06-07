import React from 'react';
import { Input } from "antd";
import PropTypes from 'prop-types'

const LoginForm = ({ className, triggerCanvas }) => {
    return (
    	<>
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
    	</>
    );
};

LoginForm.displayName = 'LoginForm';

LoginForm.propTypes = {
    className: PropTypes.string,
};

export default LoginForm;
