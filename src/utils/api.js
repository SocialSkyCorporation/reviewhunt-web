import "whatwg-fetch";
import axios from "axios";
import { getEncryptedToken, getToken } from "utils/token";
import { calculateContentPayout } from "utils/helpers/steemitHelpers";

const API_ROOT = process.env.REACT_APP_API_ROOT;

function parseJSON(res) {
  return res.json();
}

function checkError(json) {
  if (json.error) {
    throw new Error(json.error);
  }

  return json;
}

function defaultCallback(res) {
  return res;
}

function getQueryString(params) {
  return Object.keys(params)
    .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
    .join("&");
}

function request(
  method,
  path,
  params,
  shouldAuthenticate,
  tokenType,
  callback = defaultCallback
) {
  var qs = "";
  var body;
  var headers = (params && params.headers) || {
    Accept: "application/json",
    "Content-Type": "application/json"
  };
  if (shouldAuthenticate) {
    const token =
      tokenType === "steemconnect"
        ? getEncryptedToken(tokenType)
        : getToken(tokenType);
    console.log("token", token);
    headers["Authorization"] = "Token token=" + token;
  }

  if (["GET", "DELETE"].indexOf(method) > -1) {
    qs = "?" + getQueryString(params || {});
  } else {
    // POST or PUT
    body = JSON.stringify(params || {});
  }
  var url = API_ROOT + path + qs;

  console.log("url", url);

  return fetch(url, { method, headers, body })
    .then(parseJSON)
    .then(checkError)
    .then(callback);
}

async function uploadFormData(path, data, shouldAuthenticate, tokenType) {
  let headers = {};
  headers["Content-Type"] = "multipart/form-data";

  if (shouldAuthenticate) {
    const token = getToken(tokenType);
    console.log("token", token);
    headers["Authorization"] = "Token token=" + token;
  }

  var url = API_ROOT + path;

  return await axios({
    method: "POST",
    url,
    data,
    headers
  });
}

export default {
  get: (
    path,
    params,
    shouldAuthenticate = false,
    tokenType = "",
    callback = defaultCallback
  ) => request("GET", path, params, shouldAuthenticate, tokenType, callback),
  post: (
    path,
    params,
    shouldAuthenticate = false,
    tokenType = "",
    callback = defaultCallback
  ) => request("POST", path, params, shouldAuthenticate, tokenType, callback),
  put: (
    path,
    params,
    shouldAuthenticate = false,
    tokenType = "",
    callback = defaultCallback
  ) => request("PUT", path, params, shouldAuthenticate, tokenType, callback),
  delete: (
    path,
    params,
    shouldAuthenticate = false,
    tokenType = "",
    callback = defaultCallback
  ) => request("DELETE", path, params, shouldAuthenticate, tokenType, callback),
  uploadFormData
};
