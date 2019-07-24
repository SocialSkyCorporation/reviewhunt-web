import React from "react";
import { Modal, notification } from "antd";
import { TYPE_HUNTER, TYPE_MAKER } from "pages/Auth";
import api from "utils/api";
import { extractErrorMessage } from "utils/errorMessage";
import _ from "lodash";

const HunterDashboardContext = React.createContext();

const { Provider, Consumer } = HunterDashboardContext;

class HunterDashboardProvider extends React.Component {
  state = {
    campaigns: [],
    currentCampaign: null,
    fetchingQuest: false,
    submittingQuest: false,
    submitModalVisible: false,
    fetchingSubmittedQuests: false,
    joiningQuest: false,
    submittedQuests: []
  };

  updateState = (key, value) => {
    this.setState({ [key]: value });
  };

  getCampaigns = async () => {
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

  joinQuest = async (questId, channel, buzzChannelId) => {
    console.log("joining quest");
    const { submittedQuests } = this.state;

    await this.setState({
      joiningQuest: true,

      submittedQuests: submittedQuests.concat({
        buzz_channel_id: buzzChannelId,
        status: "joining"
      })
    });

    const submittedQuestsCopy = _.clone(this.state.submittedQuests);

    try {
      const result = await api.post(
        "/hunter_quests.json",
        {
          hunter_quest: {
            quest_id: questId,
            channel,
            buzz_channel_id: buzzChannelId
          }
        },
        true,
        TYPE_HUNTER
      );

      //handle submission post join
      if (
        (buzzChannelId && _.find(submittedQuestsCopy),
        ["buzz_channel_id", buzzChannelId])
      ) {
        //handle buzz join
        console.log("handling buzz join", submittedQuestsCopy);
        submittedQuestsCopy.forEach((_quest, _index) => {
          if (_quest.buzz_channel_id === result.buzz_channel_id) {
            Object.assign(_quest, result);
          }
        });
        this.setState({
          submittedQuests: submittedQuestsCopy
        });
      } else if (_.find(submittedQuests, ["id", result.id])) {
        submittedQuestsCopy.forEach((_quest, _index) => {
          if (_quest.id === result.id) {
            Object.assign(_quest, result);
          }
        });
        this.setState({
          submittedQuests: submittedQuestsCopy
        });
      } else {
        //handle initial joining quest
        this.setState({
          submittedQuests: submittedQuests.concat(result)
        });
      }

      console.log("joined", result);
    } catch (e) {
      notification["error"]({
        message: extractErrorMessage(e)
      });

      if (buzzChannelId) {
        _.find(submittedQuestsCopy, [
          "buzz_channel_id",
          buzzChannelId
        ]).status = null;
        this.setState({
          submittedQuests: submittedQuestsCopy
        });
      }
    } finally {
      this.setState({ joiningQuest: false });
    }
  };

  submitQuest = async (quest, channel, contentUrl, img) => {
    console.log("submitting", quest, channel);
    const { submittedQuests } = this.state;
    if (img.length == 0) {
      notification["error"]({
        message: "At least one image is required."
      });
      return;
    }

    // console.log("submitting", channel);
    this.setState({ submittingQuest: true });
    try {
      const formData = new FormData();
      formData.append("hunter_quest[quest_id]", quest.id);

      channel.channel_type &&
        formData.append("hunter_quest[channel]", channel.channel_type);

      contentUrl && formData.append("hunter_quest[proof_url]", contentUrl);

      quest.quest_type === "buzz" &&
        formData.append("hunter_quest[buzz_channel_id]", channel.id);

      formData.append(
        "hunter_quest[proof_image]",
        new Blob([img[0].image], { type: "image/png" })
      );

      const result = await api.uploadFormData(
        "put",
        `/hunter_quests/${quest.id}.json`,
        formData,
        true,
        TYPE_HUNTER
      );

      const submittedQuestsCopy = _.clone(submittedQuests);
      submittedQuestsCopy.forEach((_quest, _index) => {
        if (_quest.id === result.id) {
          Object.assign(_quest, result);
        }
      });

      this.setState({
        submittedQuests: submittedQuestsCopy,
        submitModalVisible: false
      });
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

  getQuestSubmissions = async id => {
    this.setState({ fetchingSubmittedQuests: true });
    api
      .get(`/hunter_quests.json?quest_id=${id}`, {}, true, TYPE_HUNTER)
      .then(submittedQuests => this.setState({ submittedQuests }))
      .catch(e => {
        notification["error"]({
          message: extractErrorMessage(e)
        });
      })
      .finally(() => {
        this.setState({ fetchingSubmittedQuests: false });
      });
  };

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          getCampaigns: this.getCampaigns,
          setCurrentCampaign: this.setCurrentCampaign,
          getQuestSubmissions: this.getQuestSubmissions,
          submitQuest: this.submitQuest,
          updateState: this.updateState,
          joinQuest: this.joinQuest
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { HunterDashboardProvider, Consumer as HunterDashboardConsumer };

export default HunterDashboardContext;
