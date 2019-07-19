import React from "react";
import {
  setParams,
  getParams,
  getRouteName,
  updateLocation
} from "utils/helpers/urlHelper";
import queryString from "query-string";
import _ from "lodash";
import { getToken } from "utils/token";
import { TYPE_HUNTER, TYPE_MAKER } from "pages/Auth";
import { TAB_PROFILE } from "pages/Profile/HunterProfile";
import { TAB_CREATE_CAMPAIGN } from "pages/Profile/MakerProfile";

const ProfileContext = React.createContext();
const { Provider, Consumer } = ProfileContext;

class ProfileProvider extends React.Component {
  constructor() {
    super();

    this.state = {
      tabIndex: null,
      campaignId: null,
      editProfile: false
    };
  }

  async componentDidMount() {
    const query = getParams(window.location);
    if (!_.isEmpty(query) && getRouteName(window.location) === "profile") {
      await this.setState({ ...query });
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
  };

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
