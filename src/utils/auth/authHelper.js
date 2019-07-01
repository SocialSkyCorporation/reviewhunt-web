import { getToken } from "utils/token";
import api from "utils/api";
import steemConnectAPI from "utils/steemConnectAPI";
import { TYPE_HUNTER, TYPE_MAKER } from "pages/Auth";

export const getSteemMe = async token => {
	token = token || getToken("steemconnect");
	if (!token) {
		console.log("not connected with steemconnect");
		return;
	}

	steemConnectAPI.setAccessToken(token);

	const me = await steemConnectAPI.me();
	return me;
};

export const getEmailMe = async (type, token) => {
  token = token || getToken(type);
  if (!token) {
    console.log("not logged in with email");
    return;
  }

  let endpoint = "";

  console.log("logging in with type", type);
  if(type === TYPE_HUNTER) endpoint = "/hunters/me.json"
  else if(type === TYPE_MAKER) endpoint = "/makers/me.json";

  const me = await api.get(endpoint, {}, true, type);

  return me;
};
