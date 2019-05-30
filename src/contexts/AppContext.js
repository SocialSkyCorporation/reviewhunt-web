import React from "react";
import { setToken, getToken } from "utils/token";
import steemConnectAPI from "utils/steemConnectAPI";

const AppContext = React.createContext();
const { Provider, Consumer } = AppContext;

class AppProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      me: null
    };
  }

  componentWillMount() {}

  componentWillUnmount() {}

  async componentDidMount() {}

  refreshMe = async () => {
    if (!getToken()) {
      return;
    }

    try {
      const me = await steemConnectAPI.me();
      this.setState({ me });
    } catch (e) {
      console.error(e);
    }
  };

  getMe = async token => {
    this.setState({ isLoading: true });
    try {
      token = token || getToken();
      console.log("token received", token);
      if (!token) {
        // yield put(getMeFailure('Not logged in'));
        return;
      }
      steemConnectAPI.setAccessToken(token);

      const me = await steemConnectAPI.me();
      setToken(token);

      // This is the only time sending non-encrypted token to the server (so server can validate users)
      // Make sure tokens must be filtered from all the logs and should not be saved in a raw format
      // const info = await api.post('/users.json', { user: { username: me.account.name, token: token } });

      // For transaction tracking
      // REF: https://steemit.com/steemapps/@therealwolf/steem-apps-update-4-more-data

      // steemConnectAPI.broadcast([
      //   [
      //     "custom_json",
      //     {
      //       // async
      //       required_auths: [],
      //       required_posting_auths: [me.account.name],
      //       id: "hunt_active_user",
      //       json: JSON.stringify({
      //         account: me.account.name,
      //         user_score: info.detailed_user_score,
      //         app: "steemhunt"
      //       })
      //     }
      //   ]
      // ]);

      await this.setState({
        me
      });
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    return (
      <Provider
        value={{
          ...this.state
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { AppProvider, Consumer as AppConsumer };

export default AppContext;
