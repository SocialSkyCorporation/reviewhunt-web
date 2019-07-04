import React, { Component } from "react";
import { Modal, notification } from "antd";
import _ from "lodash";
import api from "utils/api";
import { extractErrorMessage } from "utils/errorMessage";
import { validateImage } from "utils/helpers/uploadHelpers";
import { TYPE_MAKER } from "pages/Auth";

const NewCampaignContext = React.createContext();

const { Provider, Consumer } = NewCampaignContext;
const { confirm } = Modal;

export const STEP_CREATE_CAMPAIGN = 1;
export const STEP_CREATE_QUESTS = 2;
export const STEP_REVIEW_BUZZ = 3;
export const STEP_CAMPAIGN_BUDGET = 4;
export const STEP_CONFIRM = 5;

class NewCampaignProvider extends Component {
  state = {
    // step: STEP_CREATE_QUESTS,
    step: STEP_CREATE_CAMPAIGN,
    campaignInfo: {
      product_name: "",
      short_description: "",
      description: "",
      images: [],
      appstore: "https://appstore.com",
      playstore: "",
      website: ""
    },
    quests: [
      {
        id: null,
        value: {
          title: "",
          description: "",
          criteria: "",
          quest_type: "general",
          image: [],
          bounty_amount: 0
        },
        saved: false
      }
    ],
    channels: [],
    channelDescription: "",
    totalBudgetAmount: 1000,
    maxRewardAmount: 10,
    campaignId: 2,
    estimate: {
      total_bounty: 0,
      average_bounty_per_hunter: 0,
      participant_count: 0,
      appstore_review_count: 0,
      buzz_content_count: 0,
      total_reach: 0
    },

    fetchingEstimate: false,
    loading: false
  };

  constructor(props) {
    super(props);
    this.fetchEstimate = _.debounce(this.fetchEstimate, 1000);
  }

  createCampaign = async (form, images = []) => {
    await this.setState({ loading: true });
    try {
      const formData = new FormData();
      let validated = true;

      for (const file of images) {
        console.log(file);
        validated = validated && validateImage(file);
      }

      if (validated) {
        formData.append("campaign[images][]", new Blob(images));

        for (const key in form) {
          if (key === "urls") {
            for (const storeKey in form[key]) {
              formData.append(
                `campaign[urls][${storeKey}]`,
                form[key][storeKey]
              );
            }
          } else {
            formData.append(`campaign[${key}]`, form[key]);
          }
        }

        const result = await api.uploadFormData(
          "post",
          "/campaigns.json",
          formData,
          true,
          TYPE_MAKER
        );
        const { id } = result;
        await this.setState({ campaignId: id });
        this.setStep(STEP_CREATE_QUESTS);
        await this.setState({ loading: false });
      }
    } catch (e) {
      notification["error"]({ message: extractErrorMessage(e) });
      await this.setState({ loading: false });
    }
  };

  setStep = step => {
    this.setState({ step });
  };

  createQuest = async (id, form, index) => {
    const { quests, campaignId } = this.state;

    const formData = new FormData();
    console.log(form);
    let validated = form.image.length > 0 ? validateImage(form.image) : true;
    if (validated) {
      for (const key in form) {
        if (key === "image") {
          console.log(form[key]);
          if (form[key]) {
            formData.append(`quest[${key}]`, new Blob([form[key]]));
          }
        } else {
          formData.append(`quest[${key}]`, form[key]);
        }
      }

      try {
        const result = await api.uploadFormData(
          "post",
          `/campaigns/${campaignId}/quests.json`,
          formData,
          true,
          TYPE_MAKER
        );

        const { id } = result;
        const questsClone = _.clone(quests);
        questsClone[index]["id"] = id;
        questsClone[index]["value"] = form;
        questsClone[index]["saved"] = true;
        this.setState({ loading: false, quests: questsClone });
      } catch (e) {
        notification["error"]({ message: extractErrorMessage(e) });
        this.setState({ loading: false });
      }
    }
  };

  saveQuest = async (id, form, index) => {
    const { quests, campaignId } = this.state;

    const formData = new FormData();
    let validated = form.image ? validateImage(form.image) : true;

    if (validated) {
      for (const key in form) {
        if (key === "image") {
          console.log(form[key]);
          if (form[key]) {
            formData.append(`quest[${key}]`, new Blob([form[key]]));
          }
        } else {
          formData.append(`quest[${key}]`, form[key]);
        }
      }

      try {
        await api.uploadFormData(
          "put",
          `/campaigns/${campaignId}/quests.json`,
          formData,
          true,
          TYPE_MAKER
        );

        const questsClone = _.clone(quests);
        questsClone[index]["value"] = form;
        questsClone[index]["saved"] = true;
        this.setState({ loading: false, quests: questsClone });
      } catch (e) {
        notification["error"]({ message: extractErrorMessage(e) });
        this.setState({ loading: false });
      }
    }
  };

  deleteQuest = (index, id) => {
    const { quests, campaignId } = this.state;
    const okPressed = async () => {
      try {
        if(id) {
          await api.delete(`/campaigns/${campaignId}/quests/${id}.json`);
        }
        const questsClone = _.clone(quests);
        questsClone.splice(index, 1);
        this.setState({ quests: questsClone });
      } catch (e) {
        notification["error"]({ message: extractErrorMessage(e) });
      }
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

    this.setState({
      quests: this.state.quests.concat({
        id: null,
        value: {
          title: "",
          description: "",
          criteria: "",
          quest_type: "general",
          image: [],
          bounty_amount: 0
        },
        saved: false
      })
    });
  };

  updateCampaignInfo = (key, value) => {
    const { campaignInfo } = this.state;
    const infoClone = _.clone(campaignInfo);
    infoClone[key] = value;
    this.setState({ campaignInfo: infoClone });
  };

  updateStateSingleQuest = async (index, key, value) => {
    const { quests } = this.state;
    const questsClone = _.clone(quests);
    questsClone[index]["value"][key] = value;
    await this.setState({ quests: questsClone });
  };

  updateReviewAndBuzz = e => {
    const { channels } = this.state;
    let channelsClone = _.clone(channels);
    const value = e.target.value;

    if (e.target.checked) {
      channelsClone = channelsClone.concat(value);
    } else {
      channelsClone.splice(channelsClone.indexOf(value), 1);
    }

    this.setState({ channels: channelsClone }, () => {
      console.log(this.state.channels);
    });
  };

  updateState = (key, value) => {
    this.setState({ [key]: value });
  };

  fetchEstimate = async () => {
    console.log("fetching estimate");
    this.setState({ fetchingEstimate: true });
    const { campaignId, totalBudgetAmount, maxRewardAmount } = this.state;

    try {
      const estimate = await api.get(
        `/campaigns/${campaignId}/estimate.json`,
        { total_bounty: totalBudgetAmount, buzz_max: maxRewardAmount },
        true,
        TYPE_MAKER
      );
      this.setState({ estimate });
    } catch (e) {
      notification["error"]({ message: extractErrorMessage(e) });
    } finally {
      this.setState({ fetchingEstimate: false });
    }
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
          createCampaign: this.createCampaign,
          updateStateSingleQuest: this.updateStateSingleQuest,
          updateCampaignInfo: this.updateCampaignInfo,
          updateReviewAndBuzz: this.updateReviewAndBuzz,
          updateState: this.updateState,
          fetchEstimate: this.fetchEstimate
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { NewCampaignProvider, Consumer as NewCampaignConsumer };

export default NewCampaignContext;
