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
    fetchingSubmittedQuests: false,
    campaigns: [],
    currentCampaign: null,
    submittedItems: [],
    joiningQuest: false
  };

  setCurrentCampaign = currentCampaign => {
    this.setState({ currentCampaign });
  };

  fetchSubmittedQuests = async id => {
    const { fetchingSubmittedQuests } = this.state;
    if (fetchingSubmittedQuests) return;

    await this.setState({ fetchingSubmittedItems: true });
    try {
      const submittedItems = await api.get(
        `/campaigns/${id}/submitted.json`,
        {},
        true,
        TYPE_MAKER
      );
      // console.log("quests", items);
      this.setState({ submittedItems });
    } catch (e) {
      notification["error"]({
        message: extractErrorMessage(e)
      });
    } finally {
      await this.setState({ fetchingSubmittedItems: false });
    }
  };

  getCampaigns = async () => {
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
    try {
      const currentCampaign = await api.get(`/campaigns/${id}.json`);
      console.log("curr", currentCampaign);
      await this.setState({ currentCampaign });
    } catch (e) {
      notification["error"]({
        message: extractErrorMessage(e)
      });
    } finally {
      await this.setState({ fetchingCampaign: false });
    }
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

  approveSubmittedItem = async index => {
    const { submittedItems } = this.state;
    const clonedItems = _.clone(submittedItems);
    try {
      // clonedItems[index]["status"] = "approved";
      const { id } = clonedItems[index];
      clonedItems[index]["submitting"] = true;
      await this.setState({ submittedItems: clonedItems });

      const result = await api.patch(
        `/hunter_quests/${id}/review.json`,
        {
          hunter_quest: {
            status: "approved"
          }
        },
        true,
        TYPE_MAKER
      );

      clonedItems[index]["status"] = "approved";
      clonedItems[index]["submitting"] = false;
      this.setState({ submittedItems: clonedItems });
    } catch (e) {
      notification["error"]({
        message: extractErrorMessage(e)
      });
      clonedItems[index]["submitting"] = false;
      this.setState({ submittedItems: clonedItems });
    } finally {
    }
  };

  rejectSubmittedItem = async (index, review_comment) => {
    const { submittedItems } = this.state;
    const clonedItems = _.clone(submittedItems);
    try {
      // clonedItems[index]["status"] = "approved";
      const { id } = clonedItems[index];
      clonedItems[index]["submitting"] = true;
      await this.setState({ submittedItems: clonedItems });

      const result = await api.patch(
        `/hunter_quests/${id}/review.json`,
        {
          hunter_quest: {
            status: "rejected",
            review_comment
          }
        },
        true,
        TYPE_MAKER
      );

      clonedItems[index]["status"] = "rejected";
      clonedItems[index]["submitting"] = false;
      this.setState({ submittedItems: clonedItems });
    } catch (e) {
      notification["error"]({
        message: extractErrorMessage(e)
      });
      clonedItems[index]["submitting"] = false;
      this.setState({ submittedItems: clonedItems });
    } finally {
    }
  };

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          getCampaigns: this.getCampaigns,
          fetchCampaign: this.fetchCampaign,
          joinCampaign: this.joinCampaign,
          setCurrentCampaign: this.setCurrentCampaign,
          fetchSubmittedQuests: this.fetchSubmittedQuests,
          approveSubmittedItem: this.approveSubmittedItem,
          rejectSubmittedItem: this.rejectSubmittedItem
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { CampaignProvider, Consumer as CampaignConsumer };

export default CampaignContext;
