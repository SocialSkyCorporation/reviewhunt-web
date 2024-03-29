import sc2 from 'steemconnect';

const api = sc2.Initialize({
  baseURL: 'https://steemconnect.com',
  app: 'reviewhunt',
  callbackURL: process.env.REACT_APP_STEEMCONNECT_REDIRECT_URL,
  accessToken: 'access_token',
  scope: [ 'login', 'vote', 'comment', 'delete_comment', 'comment_options', 'custom_json' ],
});

export default api;