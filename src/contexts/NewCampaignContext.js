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

export const STEP_CREATE_CAMPAIGN = 0;
export const STEP_CREATE_QUESTS = 1;
export const STEP_REVIEW_BUZZ = 2;
export const STEP_CAMPAIGN_BUDGET = 3;
export const STEP_CONFIRM = 4;

const questOrder = ["general_1", "general_2", "general_3", "review", "buzz"];

function questSortFunction(a, b) {
  return questOrder.indexOf(a.quest_type) - questOrder.indexOf(b.quest_type);
}

const initialState = {
  step: STEP_CAMPAIGN_BUDGET,
  // step: STEP_CREATE_CAMPAIGN,
  campaignInfo: {
    product_name: "",
    short_description: "",
    description: "",
    images: [],
    urls: {
      appstore: "https://appstore.com",
      playstore: "",
      website: ""
    }
  },
  quests: [
    {
      id: null,
      title: "",
      description: "",
      criteria: "",
      quest_type: "general",
      image: [],
      bounty_amount: 0,
      saved: false
    }
  ],

  questReview: { id: null, quest_type: "review", allowed_channels: [] },
  questBuzz: { id: null, quest_type: "buzz", allowed_channels: [] },
  appstoreCriteria: "",
  channelsCriteria: "",
  totalBudgetAmount: 1000,
  maxRewardAmount: 10,
  campaignId: null,
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

class NewCampaignProvider extends Component {
  state = Object.assign({}, initialState);

  constructor(props) {
    super(props);
    this.fetchEstimate = _.debounce(this.fetchEstimate, 1000);
  }

  resetState = () => {
    this.setState({ ...initialState });
  };

  setCampaignData = campaign => {
    const { questReview, questBuzz } = this.state;
    const {
      product_name,
      short_description,
      description,
      images,
      quests,
      urls,
      id
    } = campaign;

    const reviewArr = quests.filter(q => q.quest_type === "review");
    const buzzArr = quests.filter(q => q.quest_type === "buzz");

    let reviewClone = _.clone(questReview);
    let buzzClone = _.clone(questBuzz);

    if (reviewArr.length > 0) {
      reviewClone = reviewArr[0];
    }

    if (buzzArr.length > 0) {
      buzzClone = buzzArr[0];
    }

    const campaignInfo = {
      ...initialState.campaignInfo,
      product_name,
      short_description,
      description,
      images,
      urls
    };

    this.setState({
      ...campaign,
      campaignInfo,
      quests: quests.sort(questSortFunction),
      campaignId: id,
      questReview: reviewClone,
      questBuzz: buzzClone
    });
  };

  createCampaign = async () => {
    const { campaignId, campaignInfo } = this.state;
    const { images } = campaignInfo;

    if (images.length === 0) {
      notification["error"]({
        message: "At least 1 image needs to be provided"
      });
    }

    await this.setState({ loading: true });
    try {
      const formData = new FormData();
      let validatedImages = [];

      for (const file of images) {
        let validated = false;
        validated = typeof file === "object" && validateImage(file);

        if (validated) {
          formData.append("campaign[images][]", new Blob([file]));
        }
      }

      for (const key in campaignInfo) {
        if (key === "images") continue;

        if (key === "urls") {
          for (const storeKey in campaignInfo[key]) {
            formData.append(
              `campaign[urls][${storeKey}]`,
              campaignInfo[key][storeKey]
            );
          }
        } else {
          formData.append(`campaign[${key}]`, campaignInfo[key]);
        }
      }

      const method = campaignId ? "put" : "post";
      const endpoint = campaignId
        ? `/campaigns/${campaignId}.json`
        : "/campaigns.json";

      const result = await api.uploadFormData(
        method,
        endpoint,
        formData,
        true,
        TYPE_MAKER
      );
      const { id } = result;
      await this.setState({ campaignId: id });
      this.setStep(STEP_CREATE_QUESTS);
    } catch (e) {
      notification["error"]({ message: extractErrorMessage(e) });
    } finally {
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
    this.setState({ loading: true });
    const image = form.image[0].image;
    let validated = form.image.length > 0 ? validateImage(image) : false;
    if (validated) {
      for (const key in form) {
        if (key === "image") {
          formData.append(`quest[image]`, new Blob([image]));
        } else {
          formData.append(`quest[${key}]`, form[key]);
        }
      }

      const method = id ? "put" : "post";
      const endpoint = id
        ? `/campaigns/${campaignId}/quests/${id}.json`
        : `/campaigns/${campaignId}/quests.json`;

      try {
        const result = await api.uploadFormData(
          method,
          endpoint,
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
      } finally {
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

  deleteImg = async (path, index, deleteFromServer) => {
    const { campaignId, campaignInfo } = this.state;
    const { images } = campaignInfo;

    if (deleteFromServer) {
      this.setState({ loading: true });
      try {
        const signed_id = path.split("/")[6];
        const result = await api.delete(
          `/campaigns/${campaignId}/delete_image/${signed_id}.json`,
          {},
          true,
          TYPE_MAKER
        );
        if (result.status === "DELETED") {
          const newImages = Object.assign([], images);
          newImages.splice(index, 1);
          this.setState({
            campaignInfo: { ...campaignInfo, images: newImages }
          });
        }
      } catch (e) {
        notification["error"]({ message: extractErrorMessage(e) });
      } finally {
        this.setState({ loading: false });
      }
    } else {
      const newImages = Object.assign([], images);
      newImages.splice(index, 1);
      this.setState({ campaignInfo: { ...campaignInfo, images: newImages } });
    }
  };

  deleteQuest = (index, id) => {
    const { quests, campaignId } = this.state;
    const okPressed = async () => {
      try {
        if (id) {
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
    if (quests.length > 2) return;

    this.setState({
      quests: this.state.quests.concat({
        id: null,
        title: "",
        description: "",
        criteria: "",
        quest_type: "general",
        image: [],
        bounty_amount: 0,
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
    questsClone[index][key] = value;
    await this.setState({ quests: questsClone });
  };

  updateReviewAndBuzz = (type, e) => {
    const { questReview, questBuzz } = this.state;
    let reviewClone = _.clone(questReview);
    let buzzClone = _.clone(questBuzz);
    const value = e.target.value;

    if (type === "review") {
      if (e.target.checked) {
        reviewClone["allowed_channels"] = reviewClone[
          "allowed_channels"
        ].concat(value);
      } else {
        reviewClone["allowed_channels"].splice(
          reviewClone["allowed_channels"].indexOf(value),
          1
        );
      }
      this.setState({ questReview: reviewClone });
    } else if (type === "buzz") {
      if (e.target.checked) {
        buzzClone["allowed_channels"] = buzzClone["allowed_channels"].concat(
          value
        );
      } else {
        buzzClone["allowed_channels"].splice(
          buzzClone["allowed_channels"].indexOf(value),
          1
        );
      }
      this.setState({ questBuzz: buzzClone });
    }
  };

  updateState = (key, value) => {
    this.setState({ [key]: value });
  };

  saveReviewAndBuzz = async () => {
    const {
      questReview,
      questBuzz,
      campaignInfo,
      campaignId,
      appstoreCriteria,
      channelsCriteria
    } = this.state;

    console.log("review and buzz save called");

    try {
      if (questReview["allowed_channels"].length > 0) {
        console.log(questReview);
        const reviewId = questReview.id;
        this.setState({ loading: true });
        const reviewFormdata = new FormData();
        if (questReview["allowed_channels"].includes("appstore")) {
          const appstoreUrl = campaignInfo["urls"]["appstore"];
          const playstoreUrl = campaignInfo["urls"]["playstore"];
          reviewFormdata.append("quest[quest_type]", "review");
          if (appstoreUrl) {
            reviewFormdata.append("quest[allowed_channels][]", "appstore");
          }
          if (playstoreUrl) {
            reviewFormdata.append("quest[allowed_channels][]", "playstore");
          }
          reviewFormdata.append("quest[criteria]", appstoreCriteria);
        }

        const method = reviewId ? "put" : "post";
        const endpoint = reviewId
          ? `/campaigns/${campaignId}/quests/${reviewId}.json`
          : `/campaigns/${campaignId}/quests.json`;

        const reviewResult = await api.uploadFormData(
          method,
          endpoint,
          reviewFormdata,
          true,
          TYPE_MAKER
        );
        this.setState({questReview: reviewResult});
      }
      if (questBuzz["allowed_channels"].length > 0) {
        console.log(questBuzz);
        const buzzId = questBuzz.id;
        this.setState({ loading: true });
        const buzzFormData = new FormData();
        buzzFormData.append("quest[quest_type]", "buzz");
        buzzFormData.append("quest[bounty_max]", "10");
        for (const key in questBuzz["allowed_channels"]) {
          if (key === "appstore") continue;
          buzzFormData.append(
            "quest[allowed_channels][]",
            questBuzz["allowed_channels"][key]
          );
        }

        buzzFormData.append("quest[criteria]", channelsCriteria);
        const method = buzzId ? "put" : "post";
        const endpoint = buzzId
          ? `/campaigns/${campaignId}/quests/${buzzId}.json`
          : `/campaigns/${campaignId}/quests.json`;

        const buzzResult = await api.uploadFormData(
          method,
          endpoint,
          buzzFormData,
          true,
          TYPE_MAKER
        );

        await this.setState({questBuzz: buzzResult});
      }
      this.setStep(STEP_CAMPAIGN_BUDGET);
    } catch (e) {
      notification["error"]({ message: extractErrorMessage(e) });
    } finally {
      this.setState({ loading: false });
    }
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
          deleteImg: this.deleteImg,
          createCampaign: this.createCampaign,
          updateStateSingleQuest: this.updateStateSingleQuest,
          updateCampaignInfo: this.updateCampaignInfo,
          updateReviewAndBuzz: this.updateReviewAndBuzz,
          updateState: this.updateState,
          fetchEstimate: this.fetchEstimate,
          setCampaignData: this.setCampaignData,
          resetState: this.resetState,
          saveReviewAndBuzz: this.saveReviewAndBuzz
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { NewCampaignProvider, Consumer as NewCampaignConsumer };

export default NewCampaignContext;
