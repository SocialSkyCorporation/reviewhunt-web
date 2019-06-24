import React from "react";

const NewCampaignContext = React.createContext();

const { Provider, Consumer } = NewCampaignContext;

class NewCampaignProvider extends React.Component {
  state = {
    step: 2,
    quests: [{key: 1, value: {}}]
  };

  setStep = step => {
    this.setState({ step });
  };

  addQuest = () => {
    console.log("adding quest");
    const { quests } = this.state;
    if(quests.length + 1 > 3) return;

    this.setState({quests: this.state.quests.concat({key: 2, value: {}})})
  }

  render() {
    return (
      <Provider value={{ ...this.state, setStep: this.setStep, addQuest: this.addQuest }}>
        {this.props.children}
      </Provider>
    );
  }
}

export { NewCampaignProvider, Consumer as NewCampaignConsumer };

export default NewCampaignContext;
