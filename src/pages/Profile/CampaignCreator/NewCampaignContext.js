import React from "react";
import { Modal, notification } from "antd";
import api from "utils/api";
import { extractErrorMessage } from "utils/errorMessage";
import { TYPE_MAKER } from "pages/Auth";

const NewCampaignContext = React.createContext();

const { Provider, Consumer } = NewCampaignContext;
const { confirm } = Modal;

export const STEP_CREATE_CAMPAIGN = 1;
export const STEP_CREATE_QUESTS = 2;

class NewCampaignProvider extends React.Component {
  state = {
    // step: STEP_CREATE_CAMPAIGN,
    step: STEP_CREATE_QUESTS,
    quests: [{ id: null, value: {}, saved: false, saving: false }],
    savingQuests: [],
    campaignId: 2,
    loading: false
  };

  createCampaign = async form => {
    console.log("create form", form);
    await this.setState({ loading: true });
    try {
      const result = await api.post("/campaigns.json", form, true, TYPE_MAKER);
      await this.setState({ loading: false });
      console.log("result", result);
      const { id } = result;
      await this.setState({ campaignId: id });
      this.setStep(STEP_CREATE_QUESTS);
    } catch (e) {
      console.log(e);
      notification["error"]({ message: extractErrorMessage(e) });
      await this.setState({ loading: false });
    }
  };

  setStep = step => {
    this.setState({ step });
  };

  createQuest = async (id, form, index) => {
    console.log("creating", form);
    const { quests, campaignId, savingQuests } = this.state;
    this.setState({ savingQuests: savingQuests.concat(index) });

    try {
      const result = await api.post(
        `/campaigns/${campaignId}/quests.json`,
        form,
        true,
        TYPE_MAKER
      );
      console.log("result", result);
      const { id } = result;
      quests[index]["id"] = id;
      quests[index].saved = true;
      savingQuests.splice(index, 1);
      this.setState({ quests, savingQuests });
    } catch (e) {
      console.log(e);
      notification["error"]({ message: extractErrorMessage(e) });
      savingQuests.splice(index, 1);
      this.setState({ quests, savingQuests, loading: false });
    }
  };

  saveQuest = async (id, form, index) => {
    console.log("saving", id, form);
    console.log("creating", form);
    const { quests, campaignId, savingQuests } = this.state;
    this.setState({ savingQuests: savingQuests.concat(index) });
    try {
      const result = await api.put(
        `/campaigns/${campaignId}/quests/`,
        form,
        true,
        TYPE_MAKER
      );
      console.log("result", result);
      const { id } = result;
      quests[index]["id"] = id;
      quests[index].saved = true;
      savingQuests.splice(index, 1);
      this.setState({ quests, savingQuests });
    } catch (e) {
      notification["error"]({ message: extractErrorMessage(e) });
      savingQuests.splice(index, 1);
      this.setState({ quests, savingQuests, loading: false });
    }
  };

  deleteQuest = index => {
    const { quests } = this.state;
    const okPressed = () => {
      quests.splice(index, 1);
      this.setState({ quests });
    };

    confirm({
      title: "Are you sure?",
      content: `You're about to delete Quest ${index +
        1}. This action cannot be reverted.`,
      onOk() {
        okPressed();
      },
      onCancel() {}
    });
  };

  addQuest = () => {
    console.log("adding quest");
    const { quests } = this.state;
    if (quests.length + 1 > 3) return;

    this.setState({ quests: this.state.quests.concat({ key: 2, value: {} }) });
  };

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          setStep: this.setStep,
          addQuest: this.addQuest,
          deleteQuest: this.deleteQuest,
          createQuest: this.createQuest,
          saveQuest: this.saveQuest,
          createCampaign: this.createCampaign
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { NewCampaignProvider, Consumer as NewCampaignConsumer };

export default NewCampaignContext;
