import history from "browserHistory";
import queryString from "query-string";

export function setParams(params) {
  return queryString.stringify(params);
}

export function getParams(location) {
  return queryString.parse(location.search);
}

export function updateLocation(params) {
  history.push(`?${params}`);
}
