import React from "react";
import api from "utils/api";

const CampaignContext = React.createContext();
const { Provider, Consumer } = CampaignContext;

class CampaignProvider extends React.Component {
  state = {
    fetchingCampaigns: false,
    fetchingCampaign: true,
    campaigns: [],
    currentCampaign: null
  };

  componentDidMount() {
    this.fetchCampaigns();
  }

  async fetchCampaigns() {
    await this.setState({ fetchingCampaigns: true });
    const campaigns = await api.get("/campaigns.json");
    await this.setState({ fetchingCampaigns: false, campaigns });
  }

  async fetchCampaign() {

  }

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

export { CampaignProvider, Consumer as CampaignConsumer };

export default CampaignContext;
