import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "serviceWorker";
import steem from "steem";
import { Router } from "react-router-dom";
import { AppProvider } from "contexts/AppContext";
import { AuthProvider } from "contexts/AuthContext";

import ScrollToTop from "ScrollToTop";
import App from "./App";
import history from "./history";

require("./utils/polyfill");

steem.api.setOptions({ url: process.env.REACT_APP_STEEM_API_URL });
window.API_ROOT = process.env.REACT_APP_API_ROOT;

ReactDOM.render(
	<Router history={history}>
		<AppProvider>
			<AuthProvider>
				<App />
			</AuthProvider>
		</AppProvider>
	</Router>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
