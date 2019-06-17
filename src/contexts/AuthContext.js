import React from "react";
import { notification } from "antd";
import { getRedditAuthorizationURL } from "utils/auth/redditAuthHelper";
import { getKarma } from "utils/auth/redditAuthHelper";
import { setApiKey } from "utils/auth/emailAuthHelper";
import { withRouter } from "react-router-dom";
import api from "utils/api";
import { extractErrorMessage } from "utils/errorMessage";

import { TYPE_HUNTER, TYPE_MAKER } from "pages/Auth";

const AuthContext = React.createContext();
const { Provider, Consumer } = AuthContext;

const STATUS_SIGNUP = 0;
const STATUS_LOGIN = 1;
const STATUS_ONBOARDING = 2;

class AuthProvider extends React.Component {
  state = {
    steemconnectLoading: false,
    me: null,
    loading: false,
    status: STATUS_ONBOARDING
  };

  signupFail = e => {
    this.setState({ loading: false });
    notification['error']({
      message: "Sign up failed",
      description: extractErrorMessage(e),
    });
  };

  signupSuccess = cb => {
    console.log("cb", cb);
    const {api_key, name, email} = cb;

    setApiKey(api_key);

    this.setState({loading: false, status: STATUS_ONBOARDING});
  };

  handleSignup = (type, data) => {
    this.setState({ loading: true });
    const langauge = navigator.language || navigator.userLanguage || "EN";

    let endpoint = "";
    let body = {};

    if (type === TYPE_HUNTER) {
      endpoint = "/hunters.json";
      body = {
        hunter: {
          email: data.emailAddress,
          password: data.password,
          name: data.fullName,
          country_code: data.countryOfResidence,
          langauge,
          gender: data.gender,
          year_of_birth: data.year
        }
      };
    } else if (type === TYPE_MAKER) {
      endpoint = "/makers.json";
      body = {
        maker: {
          email: data.emailAddress,
          password: data.password,
          company_name: data.companyName,
          name: data.fullName,
          business_category: data.businessCategory
        }
      };
    }

    api
      .post(endpoint, body)
      .then(this.signupSuccess)
      .catch(this.signupFail);
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
        this.setState({ steemconnectLoading: true });
        // const me = await getMe(access_token);
        // console.log("me", me);
        // this.setState({ me });

        setTimeout(() => {
          this.setState({ me: {} });
        }, 2000);

        break;
      default:
    }
  };

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          authReddit: this.authReddit,
          handleAuth: this.handleAuth,
          setFormData: this.setFormData,
          handleSignup: this.handleSignup
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

const AuthProviderWithRouter = withRouter(AuthProvider);

export { AuthProviderWithRouter as AuthProvider, Consumer as AuthConsumer, STATUS_LOGIN, STATUS_ONBOARDING, STATUS_SIGNUP };

export default AuthContext;
