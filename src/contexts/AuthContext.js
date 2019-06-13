import React from "react";
import { getRedditAuthorizationURL } from "utils/auth/redditAuthHelper";
import { getKarma } from "utils/auth/redditAuthHelper";
import { withRouter } from "react-router-dom";
import api from "utils/api";

import { TYPE_HUNTER, TYPE_MAKER } from "pages/Auth";

const AuthContext = React.createContext();
const { Provider, Consumer } = AuthContext;

class AuthProvider extends React.Component {
  state = {
    steemconnectLoading: false,
    me: null,
    loading: false
  };

  handleSignup = (type, data) => {
    this.setState({ loading: true });

    if (type === TYPE_HUNTER) {
       api
        .post("/hunters.json", {
          hunter: {
            email: data.emailAddress,
            password: data.password,
            name: data.fullName,
            country_code: 'KR',
            langauge: "EN",
            gender: "male",
            year_of_birth: "",
          }
        })
        .then(res => {
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    } else if (type === TYPE_MAKER) {
      api
        .post("/makers.json", {
          maker: {
            email: data.emailAddress,
            password: data.password,
            company_name: data.companyName,
            name: data.fullName,
            business_category: data.businessCategory
          }
        })
        .then(res => {
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }

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

export { AuthProviderWithRouter as AuthProvider, Consumer as AuthConsumer };

export default AuthContext;
