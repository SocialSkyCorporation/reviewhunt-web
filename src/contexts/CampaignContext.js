import React from "react";
import api from "utils/api";

const CampaignContext = React.createContext();
const { Provider, Consumer } = CampaignContext;

class CampaignProvider extends React.Component {
  state = {
    fetchingCampaigns: false,
    fetchingCampaign: false,
    campaigns: [],
    currentCampaign: null
  };

  componentDidMount() {
    this.fetchCampaigns();
  }

  fetchCampaigns = async () => {
    const {fetchingCampaigns} = this.state;
    if(fetchingCampaigns) return;

    console.log("fetching campaigns");
    await this.setState({ fetchingCampaigns: true });
    const campaigns = await api.get("/campaigns.json");
    await this.setState({ fetchingCampaigns: false, campaigns });
  };

  fetchCampaign = async id => {
    const {fetchingCampaign} = this.state;
    if(fetchingCampaign) return;

    console.log("fetching campaign");
    await this.setState({ fetchingCampaign: true });
    const currentCampaign = await api.get(`/campaigns/${id}.json`);
    await this.setState({ fetchingCampaign: false, currentCampaign });
  };

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          fetchCampaigns: this.fetchCampaigns,
          fetchCampaign: this.fetchCampaign
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { CampaignProvider, Consumer as CampaignConsumer };

export default CampaignContext;
