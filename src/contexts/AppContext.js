import React from "react";
import { notification } from "antd";
import api from "utils/api";
import { extractErrorMessage } from "utils/errorMessage";

const AppContext = React.createContext();
const { Provider, Consumer } = AppContext;

class AppProvider extends React.Component {
  state = {
    huntPerUsd: 0,
    totalBounty: 0,
    hunterCount: 0,
    questCount: 0
  };

  componentDidMount() {
    this.fetchHuntPrice();
    this.fetchInterval = setInterval(() => {
      this.fetchHuntPrice();
    }, 1000 * 60);
  }

  componentWillUnmount() {
    clearInterval(this.fetchInterval);
  }

  fetchHuntPrice = async () => {
    try {
      const result = await api.get("/stats.json");
      const { price_hunt, total_bounty, hunter_count, quest_count } = result;
      this.setState({
        huntPerUsd: price_hunt,
        totalBounty: total_bounty,
        hunterCount: hunter_count,
        questCount: quest_count
      });
    } catch (e) {
      notification["error"]({ message: extractErrorMessage(e) });
      clearInterval(this.fetchInterval);
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
