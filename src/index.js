import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "serviceWorker";
import steem from "steem";
import { Router } from "react-router-dom";
import { AppProvider } from "contexts/AppContext";
import { AuthProvider } from "contexts/AuthContext";
import { CampaignProvider } from "contexts/CampaignContext";
import { WalletProvider } from "contexts/WalletContext";
import { HunterDashboardProvider } from "contexts/HunterDashboardContext";
import { NewCampaignProvider } from "contexts/NewCampaignContext";
import CircularProgress from "components/CircularProgress";
import { StripeProvider } from "react-stripe-elements";

import App from "./App";
import history from "./history";
import "i18n";

require("./utils/polyfill");

steem.api.setOptions({ url: process.env.REACT_APP_STEEM_API_URL });
window.API_ROOT = process.env.REACT_APP_API_ROOT;

ReactDOM.render(
	<Suspense fallback={<CircularProgress />}>
		<Router history={history}>
			<AppProvider>
				<AuthProvider>
					<StripeProvider apiKey="pk_test_12345">
						<NewCampaignProvider>
							<CampaignProvider>
								<HunterDashboardProvider>
									<WalletProvider>
										<App />
									</WalletProvider>
								</HunterDashboardProvider>
							</CampaignProvider>
						</NewCampaignProvider>
					</StripeProvider>
				</AuthProvider>
			</AppProvider>
		</Router>
	</Suspense>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
