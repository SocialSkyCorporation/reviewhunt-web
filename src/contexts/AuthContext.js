import React from "react";
import { getRedditAuthorizationURL } from "utils/auth/redditAuthHelper";
import { getKarma } from "utils/auth/redditAuthHelper";
import { withRouter } from 'react-router-dom';

const AuthContext = React.createContext();
const { Provider, Consumer } = AuthContext;

class AuthProvider extends React.Component {
  state = {
    steemconnectLoading: false,
    me: null 
  };

  authReddit() {
    const url = getRedditAuthorizationURL();
    window.location = url;
  }

  handleAuth = async (source, obj) => {
    console.log("parsed url", source, obj);
    switch (source) {
      case "reddit":
        const { code } = obj;
        getKarma(code);
        break;
      case "youtube":
        break;
      case "instagram":
        break;
      case "steemconnect":
        const { access_token, state } = obj;
        this.props.history.replace(state);
        this.setState({steemconnectLoading: true});
        // const me = await getMe(access_token);
        // console.log("me", me);
        // this.setState({ me });

        setTimeout(() => {
          this.setState({ me: {} });
        }, 2000)

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

const AuthProviderWithRouter = withRouter(AuthProvider);

export { AuthProviderWithRouter as AuthProvider, Consumer as AuthConsumer };

export default AuthContext;
