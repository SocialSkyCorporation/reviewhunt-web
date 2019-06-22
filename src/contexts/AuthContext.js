import React from "react";
import { notification } from "antd";
import { getKarma } from "utils/auth/redditAuthHelper";
import { getSteemMe, getEmailMe } from "utils/auth/authHelper";
import { getToken, setToken } from "utils/token";
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
    steemMe: null,
    emailMe: null,
    loading: false,
    authenticating: false,
    status: STATUS_LOGIN,
    userType: TYPE_HUNTER,
    socialChannels: []
  };

  async componentDidMount() {
    this.setState({ authenticating: true });
    const lastLoginType = getToken("last_login");
    console.log("last login", lastLoginType);

    if (lastLoginType) {
      const emailMe = await getEmailMe(lastLoginType);
      console.log(emailMe);
      await this.setState({
        emailMe,
        authenticating: false,
        userType: lastLoginType
      });
      this.props.history.replace("/profile");
    }
  }

  handleError = e => {
    this.setState({ loading: false });
    notification["error"]({
      message: extractErrorMessage(e)
    });
  };

  authSuccess = async (type, cb) => {
    console.log("cb", cb);
    const { api_key, name, email } = cb;
    setToken(type, api_key);
    setToken("last_login", type);
    await this.setState({ loading: false, name, email });
    this.props.history.replace("/profile");
  };

  handleSignup = (type, data) => {
    const { loading } = this.state;
    if (loading) return;
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
          company_name: data.nameOfCompany,
          name: data.fullName,
          business_category: data.businessCategory
        }
      };
    }

    api
      .post(endpoint, body)
      .then(cb => this.authSuccess(type, cb))
      .catch(this.handleError);
  };

  handleLogin = (type, data) => {
    this.setState({ loading: true });

    let endpoint = "";

    if (type === TYPE_HUNTER) {
      endpoint = `/hunters/api_key.json`;
    } else if (type === TYPE_MAKER) {
      endpoint = "/makers/api_key.json";
    }

    api
      .get(endpoint, data)
      .then(cb => this.authSuccess(type, cb))
      .catch(this.handleError);
  };

  setSocialChannels = socialChannels => {
    this.setState({ socialChannels });
  };

  deleteSocialItem = index => {
    const { socialChannels } = this.state;
    let newChannels = Object.assign([], socialChannels);
    newChannels.splice(index, 1);
    this.setState({ socialChannels: newChannels });
  };

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

        try {
          const stateValue = JSON.parse(state);
          const { path, socialChannels } = stateValue;
          this.props.history.replace(path);
          this.setState({ steemconnectLoading: true, socialChannels });

          setToken("steemconnect", access_token);
          const me = await getSteemMe(access_token);
          console.log("me", me);
          this.setState({ me });
        } catch (e) {
          notification["error"]({ message: extractErrorMessage(e) });
        }

        break;
      default:
    }
  };

  setStatus = status => {
    this.setState({ status });
  };

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          authReddit: this.authReddit,
          handleAuth: this.handleAuth,
          setFormData: this.setFormData,
          handleSignup: this.handleSignup,
          handleLogin: this.handleLogin,
          deleteSocialItem: this.deleteSocialItem,
          setSocialChannels: this.setSocialChannels,
          setStatus: this.setStatus
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

const AuthProviderWithRouter = withRouter(AuthProvider);

export {
  AuthProviderWithRouter as AuthProvider,
  Consumer as AuthConsumer,
  STATUS_LOGIN,
  STATUS_ONBOARDING,
  STATUS_SIGNUP
};

export default AuthContext;
