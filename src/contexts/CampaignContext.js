import React from "react";
import { notification } from "antd";
import api from "utils/api";
import { TYPE_MAKER, TYPE_HUNTER } from "pages/Auth";
import { extractErrorMessage } from "utils/errorMessage";
import _ from "lodash";

const CampaignContext = React.createContext();
const { Provider, Consumer } = CampaignContext;

class CampaignProvider extends React.Component {
  state = {
    fetchingCampaigns: false,
    fetchingCampaign: false,
    campaigns: [],
    currentCampaign: null,
    joiningQuest: false
  };

  componentDidMount() {
    this.fetchCampaigns();
  }

  setCurrentCampaign = currentCampaign => {
    this.setState({currentCampaign})
  }

  fetchCampaigns = async () => {
    const { fetchingCampaigns } = this.state;
    if (fetchingCampaigns) return;

    await this.setState({ fetchingCampaigns: true });
    const campaigns = await api.get("/campaigns.json");
    await this.setState({ fetchingCampaigns: false, campaigns });
  };

  fetchCampaign = async id => {
    const { fetchingCampaign } = this.state;
    if (fetchingCampaign) return;

    await this.setState({ fetchingCampaign: true });
    const currentCampaign = await api.get(`/campaigns/${id}.json`);
    await this.setState({ fetchingCampaign: false, currentCampaign });
  };

  joinCampaign = async id => {
    const { currentCampaign, joiningQuest } = this.state;
    const { joined } = currentCampaign;
    if (joiningQuest) return;

    this.setState({ joiningQuest: true });

    let joinUnjoin = joined
      ? () => api.delete(`/campaigns/${id}/unjoin.json`, {}, true, TYPE_HUNTER)
      : () => api.post(`/campaigns/${id}/join.json`, {}, true, TYPE_HUNTER);

    try {
      const result = await joinUnjoin();

      const { subscribed } = result;
      const currentCampaignClone = _.clone(currentCampaign);
      currentCampaignClone["joined"] = subscribed;
      this.setState({ currentCampaign: currentCampaignClone });
    } catch (e) {
      notification["error"]({
        message: extractErrorMessage(e)
      });
    } finally {
      this.setState({ joiningQuest: false });
    }
  };

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          fetchCampaigns: this.fetchCampaigns,
          fetchCampaign: this.fetchCampaign,
          joinCampaign: this.joinCampaign,
          setCurrentCampaign: this.setCurrentCampaign
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { CampaignProvider, Consumer as CampaignConsumer };

export default CampaignContext;
