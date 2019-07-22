import history from "browserHistory";
import queryString from "query-string";

export function setParams(params) {
  return queryString.stringify(params);
}

export function getParams(location) {
  return queryString.parse(location.search, { parseNumbers: true, parseBooleans: true });
}

export function updateLocation(params) {
  history.push(`?${params}`);
}

export function getRouteName(location) {
  const splitPath = location.pathname.split("/");

  return splitPath.length > 1 ? splitPath[1] : "/";
}
