import React from "react";
import { setParams, getParams, updateLocation } from "utils/helpers/urlHelper";
import queryString from "query-string";
import _ from "lodash";

const ProfileContext = React.createContext();
const { Provider, Consumer } = ProfileContext;

class ProfileProvider extends React.Component {
  state = {
    tabIndex: 0,
    campaignId: null,
    editProfile: false
  };

  async componentDidMount() {
    const query = getParams(window.location);
    if (!_.isEmpty(query)) {
      await this.setState({ ...query });
      console.log("query updated", query);
      this.updateLocation();
    }
  }

  updateLocation = () => {
    const url = setParams({ ...this.state });
    updateLocation(url);
  };

  setTabIndex = async tabIndex => {
    await this.setState({ tabIndex });
    this.updateLocation();
  };

  setCampaignId = async campaignId => {
    await this.setState({ campaignId });
    this.updateLocation();
  }

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          setTabIndex: this.setTabIndex,
          setCampaignId: this.setCampaignId,
          updateLocation: this.updateLocation
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { ProfileProvider, Consumer as ProfileConsumer };

export default ProfileContext;
