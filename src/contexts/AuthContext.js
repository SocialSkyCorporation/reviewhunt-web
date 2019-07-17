import React from "react";
import { notification } from "antd";
import { getKarma } from "utils/auth/redditAuthHelper";
import { getSteemMe, getEmailMe } from "utils/auth/authHelper";
import { getToken, setToken, removeToken } from "utils/token";
import { withRouter } from "react-router-dom";
import api from "utils/api";
import _ from 'lodash';
import queryString from "query-string";
import { extractErrorMessage } from "utils/errorMessage";
import {
  getParams,
  setParams,
  updateLocation,
  getRouteName
} from "utils/helpers/urlHelper";
import { TYPE_HUNTER, TYPE_MAKER } from "pages/Auth";

const AuthContext = React.createContext();
const { Provider, Consumer } = AuthContext;

const STATUS_SIGNUP = "signup";
const STATUS_LOGIN = "login";
const STATUS_ONBOARDING = "onboarding";

class AuthProvider extends React.Component {
  state = {
    steemconnectLoading: false,
    steemMe: null,
    emailMe: null,
    loading: false,
    authenticating: true,
    status: STATUS_LOGIN,
    userType: TYPE_HUNTER,
    socialChannels: []
  };

  componentWillMount() {
    let parsedURL = null;
    const source = getRouteName(this.props.location);

    if (this.props.location.search && source === "auth") {
      try {
        parsedURL = queryString.parse(this.props.location.search);
        console.log("parsed", parsedURL);
        console.log("source", source);
        //handle contents differently based on source
        this.handleAuth(source, parsedURL);
      } catch (e) {
        console.log("URI Parse error", this.props.location.search, e);
      }
    }
  }

  async componentDidMount() {
    await this.setState({ authenticating: true });

    const lastLoginType = getToken("last_login");

    try {
      const steemToken = getToken("steemconnect");
      if (steemToken) {
        this.setState({ steemconnectLoading: true });
        const steemMe = await getSteemMe(steemToken);
        console.log("steem me", steemMe);
        await this.setState({ steemconnectLoading: false, steemMe });
      }

      console.log("last login type", lastLoginType);
      if (lastLoginType) {
        const emailMe = await getEmailMe(lastLoginType);
        console.log("me", emailMe);
        await this.setState({
          emailMe,
          authenticating: false,
          userType: lastLoginType
        });
        const path = window.location.pathname;
        const query = window.location.search;

        if (path === "/auth") {
          this.props.history.push(`/profile${query}`);
        } else {
          this.props.history.replace(`${window.location.pathname}${query}`);
        }
      } else {
        await this.setState({ authenticating: false });
        const query = getParams(window.location);
        if (!_.isEmpty(query) && getRouteName(window.location) === "auth") {
          await this.setState({ ...query });
        }
      }
    } catch (e) {
      removeToken(lastLoginType);
      this.handleError(e);
      this.setState({ authenticating: false });
    }
  }

  handleError = e => {
    this.setState({ loading: false, authenticating: false });
    notification["error"]({
      message: extractErrorMessage(e)
    });
  };

  authSuccess = async (type, cb) => {
    const { api_key } = cb;
    setToken(type, api_key);
    setToken("last_login", type);
    const emailMe = await getEmailMe(type);
    await this.setState({
      authenticating: false,
      loading: false,
      emailMe,
      userType: type
    });
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
    this.setState({ authenticating: true, loading: true });
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
    switch (source) {
      case "auth":
        break;
      case "steemconnect":
        const { access_token, state } = obj;

        try {
          const stateValue = JSON.parse(state);
          const { path, socialChannels } = stateValue;
          this.props.history.replace(path);
          this.setState({ steemconnectLoading: true, socialChannels });

          setToken("steemconnect", access_token);
          const steemMe = await getSteemMe(access_token);
          this.setState({ steemMe });
        } catch (e) {
          this.handleError(e);
        }

        break;
      default:
    }
  };

  setStatus = async status => {
    await this.setState({ status });
    const url = setParams({ status });
    updateLocation(url);
  };

  logout = async () => {
    const lastLoginType = getToken("last_login");
    if (lastLoginType) {
      removeToken("last_login");
      removeToken(lastLoginType);
      await this.setState({ emailMe: null });
      this.props.history.replace("/auth");
    }
  };

  disconnectSteem = async () => {
    const steemToken = getToken("steemconnect");
    if (steemToken) {
      removeToken("steemconnect");
      await this.setState({ steemMe: null });
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
          handleSignup: this.handleSignup,
          handleLogin: this.handleLogin,
          deleteSocialItem: this.deleteSocialItem,
          setSocialChannels: this.setSocialChannels,
          setStatus: this.setStatus,
          logout: this.logout,
          disconnectSteem: this.disconnectSteem
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
