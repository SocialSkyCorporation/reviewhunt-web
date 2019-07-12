import React from "react";
import { notification } from "antd";
import { TYPE_HUNTER, TYPE_MAKER } from "pages/Auth";
import api from "utils/api";
import { extractErrorMessage } from "utils/errorMessage";

const HunterDashboardContext = React.createContext();

const { Provider, Consumer } = HunterDashboardContext;

class HunterDashboardProvider extends React.Component {
  state = {
    campaigns: [],
    currentCampaign: null,
    fetchingQuest: false,
    submittingQuest: false
  };

  fetchCampaigns = async () => {
    const { fetchingQuest } = this.state;
    if (fetchingQuest) return;

    this.setState({ fetchingQuest: true });

    try {
      const campaigns = await api.get(
        "/campaigns/mine.json",
        {},
        true,
        TYPE_HUNTER
      );
      console.log("fetched campaigns", campaigns);
      this.setState({ campaigns });
    } catch (e) {
      notification["error"]({
        message: extractErrorMessage(e)
      });
    } finally {
      this.setState({ fetchingQuest: false });
    }
  };

  submitQuest = async (quest, channel, proof, img) => {
    const { id, quest_type } = quest;
    const { currentCampaign } = this.state;
    console.log("current quest is", quest_type, id);
    this.setState({ submittingQuest: true });
    try {
      const hunter_quest = {};
      hunter_quest["quest_id"] = id;
      hunter_quest["channel"] = channel;
      hunter_quest["proof"] = proof;
      hunter_quest["proof_image"] = img;
      const result = await api.post(
        "/hunter_quests.json",
        hunter_quest,
        true,
        TYPE_HUNTER
      );
      console.log(result);
    } catch (e) {
      notification["error"]({
        message: extractErrorMessage(e)
      });
    } finally {
      this.setState({ submittingQuest: false });
    }
  };

  setCurrentCampaign = currentCampaign => {
    this.setState({ currentCampaign });
  };

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          fetchCampaigns: this.fetchCampaigns,
          setCurrentCampaign: this.setCurrentCampaign,
          submitQuest: this.submitQuest
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { HunterDashboardProvider, Consumer as HunterDashboardConsumer };

export default HunterDashboardContext;
