import { getToken } from "utils/token";
import steemConnectAPI from "utils/steemConnectAPI";

export const getMe = async token => {
	token = token || getToken();
	if (!token) {
		console.log("not logged in");
		return;
	}

	steemConnectAPI.setAccessToken(token);

	const me = await steemConnectAPI.me();
	return me;
};
