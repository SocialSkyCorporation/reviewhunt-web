import { sha256 } from 'js-sha256';

export function getApiKey() {
  return window.safeStorage.getItem('access_token');
}
export function getEncryptedApiKey() {
  const apiKey = getApiKey();

  if (apiKey) {
    return sha256(apiKey);
  } else {
    return null;
  }
}
export function setApiKey(apiKey) {
  return window.safeStorage.setItem('api_key', apiKey);
}
export function removeToken() {
  return window.safeStorage.removeItem('api_key');
}