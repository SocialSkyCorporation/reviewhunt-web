import React from "react";
import { getRedditAuthorizationURL } from "utils/auth/redditAuthHelper";
import { retrieveAccessToken, getKarma } from "../utils/auth/redditAuthHelper";

const AuthContext = React.createContext();
const { Provider, Consumer } = AuthContext;

class AuthProvider extends React.Component {
  state = {};

  authReddit() {
    const url = getRedditAuthorizationURL();

    window.location = url;
  }

  handleAuth(source, obj) {
    console.log("parsed url", obj);
    switch (source) {
      case "reddit":
        const { code } = obj;
        getKarma(code);
        break;
      case "youtube":
        break;
      case "instagram":
        break;
      default:
    }
  }

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          authReddit: this.authReddit,
          handleAuth: this.handleAuth
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { AuthProvider, Consumer as AuthConsumer };

export default AuthContext;
