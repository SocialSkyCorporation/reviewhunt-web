import steemConnectAPI from 'utils/steemConnectAPI';
import { sha256 } from 'js-sha256';

export function getToken(key) {
  return window.safeStorage.getItem(key);
}

export function getEncryptedToken(key) {
  const accessToken = getToken(key);

  if (accessToken) {
    return sha256(accessToken);
  } else {
    return null;
  }
}

export function setToken(key, token) {
  return window.safeStorage.setItem(key, token);
}

export function removeToken(key) {
  return window.safeStorage.removeItem(key);
}

export const getLoginURL = (state = {}) => steemConnectAPI.getLoginURL(JSON.stringify({...state, path: window.location.pathname}));

