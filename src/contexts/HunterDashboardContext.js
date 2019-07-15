import React from "react";
import { Modal, notification } from "antd";
import { TYPE_HUNTER, TYPE_MAKER } from "pages/Auth";
import api from "utils/api";
import { extractErrorMessage } from "utils/errorMessage";
import _ from 'lodash';

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

  submitQuest = async (quest, channel, url, img) => {
    const { id, quest_type } = quest;
    const { currentCampaign } = this.state;
    console.log("current quest is", quest_type, id);
    this.setState({ submittingQuest: true });
    try {
      const formData = new FormData();
      formData.append("hunter_quest[quest_id]", id);
      channel && formData.append("hunter_quest[channel]", channel);
      url && formData.append("hunter_quest[proof_url]", url);
      formData.append("hunter_quest[proof_image]", new Blob(img, {type: 'image/png'}));

      const result = await api.uploadFormData(
        "post",
        "/hunter_quests.json",
        formData,
        true,
        TYPE_HUNTER
      );

      const campaignCopy = _.clone(currentCampaign);
      campaignCopy.quests.forEach((_quest, _index) => {
        if(_quest.id === result.id) {
          Object.assign(_quest, result);
        }
      })

      this.setState({currentCampaign: campaignCopy});
      Modal.destroyAll();
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
