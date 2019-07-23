import React from "react";
import { notification } from "antd";
import { getKarma } from "utils/auth/redditAuthHelper";
import { getSteemMe, getEmailMe } from "utils/auth/authHelper";
import { getToken, setToken, removeToken } from "utils/token";
import { withRouter } from "react-router-dom";
import api from "utils/api";
import _ from "lodash";
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
    emailMeUpdate: null,
    loading: false,
    authenticating: true,
    status: STATUS_LOGIN,
    userType: TYPE_HUNTER,
    socialChannels: [],
    refreshingBuzz: false,
    savingChannels: false,
    updatingUserInformation: false,
    editProfile: false
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
          emailMeUpdate: emailMe,
          authenticating: false,
          userType: lastLoginType
        });
        const path = window.location.pathname;
        console.log("path", path);
        const query = window.location.search;
        const queryObj = getParams(window.location);
        if (!_.isEmpty(queryObj) && path.indexOf("/steemconnect") > -1) {
          await this.setState({ ...queryObj });
          console.log("updated query", this.state);
          this.props.history.replace(`/profile`);
        } else if (path === "/auth") {
          this.props.history.replace(`/profile${query}`);
        } else {
          this.props.history.replace(`${window.location.pathname}${query}`);
        }
      } else {
        await this.setState({ authenticating: false });
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
      emailMeUpdate: emailMe,
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

  getSocialChannels = async () => {
    console.log("getting social channels");
    this.setState({ loading: true });
    api
      .get("/buzz_channels/mine.json", {}, true, TYPE_HUNTER)
      .then(socialChannels => {
        socialChannels.forEach(channel => (channel.estimating = false));
        this.setState({ socialChannels });
      })
      .catch(this.handleError)
      .finally(() => this.setState({ loading: false }));
  };

  evaluateChannel = async index => {
    const { socialChannels } = this.state;
    const { url, value } = socialChannels[index];

    api
      .get(`/buzz_channels/check.json?channel=${value}&url=${url}`)
      .then(result => {
        const socialChannelsClone = _.clone(socialChannels);
        socialChannelsClone[index] = {
          ...socialChannelsClone[index],
          ...result,
          estimating: false
        };
        this.setState({ socialChannels: socialChannelsClone });
      })
      .catch(e => {
        notification["error"]({
          message: extractErrorMessage(e)
        });
        const socialChannelsClone = _.clone(socialChannels);
        socialChannelsClone.splice(1, index);
        this.setState({ socialChannels: socialChannelsClone });
      });
  };

  addSocialChannel = async channel => {
    console.log("adding", channel);
    const { socialChannels } = this.state;
    await this.setState({ socialChannels: socialChannels.concat(channel) });
    let newChannels = _.clone(this.state.socialChannels);
    const index = this.state.socialChannels.length - 1;
    try {
      const result = await api.post(
        "/buzz_channels.json",
        {
          buzz_channel: {
            channel_type: channel.key,
            url: channel.url
          }
        },
        true,
        TYPE_HUNTER
      );
      newChannels[index] = result;
    } catch (e) {
      this.handleError(e);
      newChannels.splice(index, 1);
    } finally {
      this.setState({ socialChannels: newChannels });
    }
  };

  setSocialChannels = async socialChannels => {
    await this.setState({ socialChannels });
    this.evaluateChannel(this.state.socialChannels.length - 1);
  };

  deleteSocialChannel = async index => {
    const { socialChannels } = this.state;

    console.log("deleting social channel");

    let newChannels = _.clone(socialChannels);
    newChannels[index]["estimating"] = true;

    try {
      const { id } = socialChannels[index];
      if (id) {
        const { status } = await api.delete(
          `/buzz_channels/${id}.json`,
          {},
          true,
          TYPE_HUNTER
        );
        if (status === "DELETED") {
          newChannels.splice(index, 1);
          this.setState({ socialChannels: newChannels });
        } else {
          newChannels[index]["estimating"] = true;
        }
      } else {
        newChannels.splice(index, 1);
      }
    } catch (e) {
      this.handleError(e);
    } finally {
      await this.setState({ socialChannels: newChannels });
    }
  };

  //used for onboarding
  saveSocialChannels = async () => {
    const { socialChannels } = this.state;
    console.log("saving social channels");
    this.setState({ savingChannels: true });
    try {
      for (const channel of socialChannels) {
        const form = {
          buzz_channel: {
            channel_type: channel.key,
            url: channel.url
          }
        };
        await api.post("/buzz_channels.json", form, true, TYPE_HUNTER);
      }
      this.props.history.replace("/profile");
    } catch (e) {
      this.handleError(e);
    } finally {
      this.setState({ savingChannels: false });
    }
  };

  refreshBuzz = async () => {
    console.log("refreshing buzz");
    const { socialChannels } = this.state;
    const socialChannelsClone = _.clone(socialChannels);

    this.setState({ refreshingBuzz: true });
    try {
      for (const index in socialChannels) {
        console.log("refreshing", socialChannels[index]);
        const channel = socialChannels[index];
        const result = await api.put(
          `/buzz_channels/${channel.id}/refresh.json`,
          {},
          true,
          TYPE_HUNTER
        );
        socialChannelsClone[index] = result;
      }

      this.setState({ socialChannels: socialChannelsClone });
    } catch (e) {
      this.handleError(e);
    } finally {
      this.setState({ refreshingBuzz: false });
    }
  };

  handleAuth = async (source, obj) => {
    switch (source) {
      case "auth":
        const { access_token, state } = obj;

        try {
          const stateValue = JSON.parse(state);
          const { path, socialChannels } = stateValue;
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
      await this.setState({ emailMe: null, emailMeUpdate: null });
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

  updateUserInformation = async () => {
    const { userType, emailMeUpdate, emailMe } = this.state;
    console.log("updating user info", userType, emailMeUpdate);

    const { old_password, new_password } = emailMeUpdate;

    let endpointPrefix = "";
    let shouldUpdatePassword = false;
    let body = {};

    if (userType === TYPE_HUNTER) {
      endpointPrefix = `/hunters`;
      const { email, name, country_code, langauge } = emailMeUpdate;
      body = { hunter: { email, name, country_code, langauge } };
    } else if (userType === TYPE_MAKER) {
      endpointPrefix = `/makers`;
      const { email, company_name, name, business_category } = emailMeUpdate;
      body = { maker: { email, company_name, name, business_category } };
    }

    this.setState({ updatingUserInformation: true });

    try {
      if (old_password && new_password) {
        const result = await api.patch(
          `${endpointPrefix}/update_password.json`,
          { old_password, new_password },
          true,
          userType
        );
        const { api_key } = result;
        setToken(userType, api_key);
        await this.setState({ emailMe: { ...emailMe, ...result } });
      }

      const updateResult = await api.put(
        `${endpointPrefix}/me.json`,
        body,
        true,
        userType
      );

      const { api_key } = updateResult;
      setToken(userType, api_key);
      console.log(updateResult);
      await this.setState({ emailMe: { ...emailMe, ...updateResult } });
    } catch (e) {
      this.handleError(e);
    } finally {
      this.setState({ updatingUserInformation: false, editProfile: false });
    }
  };

  updateEmailForm = async (key, value) => {
    const { emailMeUpdate } = this.state;
    const emailMeClone = _.clone(emailMeUpdate);
    emailMeClone[key] = value;
    this.setState({ emailMeUpdate: emailMeClone });
  };

  updateState = (key, value) => {
    this.setState({ [key]: value });
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
          deleteSocialChannel: this.deleteSocialChannel,
          setSocialChannels: this.setSocialChannels,
          setStatus: this.setStatus,
          logout: this.logout,
          disconnectSteem: this.disconnectSteem,
          saveSocialChannels: this.saveSocialChannels,
          getSocialChannels: this.getSocialChannels,
          addSocialChannel: this.addSocialChannel,
          refreshBuzz: this.refreshBuzz,
          updateUserInformation: this.updateUserInformation,
          updateEmailForm: this.updateEmailForm,
          updateState: this.updateState
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
