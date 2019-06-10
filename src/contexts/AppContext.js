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
      authenticated: true 
    };
  }

  componentWillMount() {}

  componentWillUnmount() {}


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
