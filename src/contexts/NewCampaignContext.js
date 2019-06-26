import React from "react";
import { Modal, notification } from "antd";
import _ from "lodash";
import axios from "axios";
import api from "utils/api";
import { extractErrorMessage } from "utils/errorMessage";
import { getToken } from "utils/token";
import { validateImage } from "utils/helpers/uploadHelpers";
import { TYPE_MAKER } from "pages/Auth";

const UPLOAD_API = `${process.env.REACT_APP_API_ROOT}/campaigns.json`;

const NewCampaignContext = React.createContext();

const { Provider, Consumer } = NewCampaignContext;
const { confirm } = Modal;

export const STEP_CREATE_CAMPAIGN = 1;
export const STEP_CREATE_QUESTS = 2;

class NewCampaignProvider extends React.Component {
  state = {
    // step: STEP_CREATE_CAMPAIGN,
    step: STEP_CREATE_CAMPAIGN,
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
    campaignId: 2,
    loading: false
  };

  createCampaign = async (form, images = []) => {
    // await this.setState({ loading: true });
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

        const token = getToken(TYPE_MAKER);
        axios({
          method: "post",
          url: UPLOAD_API,
          data: formData,
          headers: {
            Authorization: `Token token=${token}`
          },
          config: {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        });
      }

      // uploadImages(endpoint, )
      // const result = await api.post("/campaigns.json", form, true, TYPE_MAKER);
      // await this.setState({ loading: false });
      // const { id } = result;
      // await this.setState({ campaignId: id });
      // this.setStep(STEP_CREATE_QUESTS);
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

    try {
      const result = await api.post(
        `/campaigns/${campaignId}/quests.json`,
        form,
        true,
        TYPE_MAKER
      );
      const { id } = result;
      const questsClone = _.clone(quests);
      questsClone[index]["id"] = id;
      questsClone[index]["value"] = form;
      questsClone[index]["saved"] = true;
      this.setState({ quests: questsClone });
    } catch (e) {
      notification["error"]({ message: extractErrorMessage(e) });
      this.setState({ loading: false });
    }
  };

  saveQuest = async (id, form, index) => {
    const { quests, campaignId } = this.state;

    try {
      const result = await api.put(
        `/campaigns/${campaignId}/quests/${id}`,
        form,
        true,
        TYPE_MAKER
      );
      const questsClone = _.clone(quests);
      questsClone[index]["id"] = id;
      questsClone[index]["value"] = form;
      questsClone[index]["saved"] = true;
      this.setState({ quests: questsClone });
    } catch (e) {
      notification["error"]({ message: extractErrorMessage(e) });
      this.setState({ loading: false });
    }
  };

  deleteQuest = index => {
    const { quests } = this.state;
    const okPressed = () => {
      const questsClone = _.clone(quests);
      questsClone.splice(index, 1);
      this.setState({ quests: questsClone });
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

  updateStateSingleQuest = async (index, key, value) => {
    const { quests } = this.state;
    const questsClone = _.clone(quests);
    questsClone[index]["value"][key] = value;
    await this.setState({ quests: questsClone });
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
          updateStateSingleQuest: this.updateStateSingleQuest
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { NewCampaignProvider, Consumer as NewCampaignConsumer };

export default NewCampaignContext;
