const REDDIT_AUTH_URL = "https://www.reddit.com/api/v1";
const REDDIT_API_URL = "https://oauth.reddit.com/api/v1";
const REDDIT_CLIENT_ID = "DD5bEUuLLvIcBw";

export const getRedditAuthorizationURL = () => {
  const url = `${REDDIT_AUTH_URL}/authorize?client_id=${REDDIT_CLIENT_ID}&response_type=code&state=${"abcde"}&redirect_uri=${
    process.env.REACT_APP_REDDIT_REDIRECT_URL
  }&duration=temporary&scope=mysubreddits`;

  return url;
};

export const retrieveAccessToken = async code => {
  const url = `${REDDIT_AUTH_URL}/access_token`;

  let headers = new Headers();
  headers.set(
    "Authorization",
    "Basic " +
      btoa(REDDIT_CLIENT_ID + ":" + process.env.REACT_APP_REDDIT_API_SECRET)
  );

  var form = new FormData();
  form.append("grant_type", "authorization_code");
  form.append("code", code);
  form.append("redirect_uri", process.env.REACT_APP_REDDIT_REDIRECT_URL);

  const body = form;

  try {
    const result = await fetch(url, {
      method: "POST",
      headers,
      body
    });

    const json = await result.json();

    const { access_token } = json;
    if (!access_token) throw new Error("invalid access token");

    return access_token;
  } catch (e) {
    console.log(e);
  }
};

export const getKarma = async code => {
  const url = `${REDDIT_API_URL}/me/karma`;

  const access_token = await retrieveAccessToken(code);

  let headers = new Headers();
  headers.set("Authorization", `bearer ${access_token}`);

  try {
    const result = await fetch(url, {
      method: "GET",
      headers
    });

    const json = await result.json();

    console.log("json", json);
  } catch (e) {
    console.log(e);
  }
};
