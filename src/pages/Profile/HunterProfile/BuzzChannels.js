import React from "react";
import PropTypes from "prop-types";
import { Avatar, Input, Select, Icon, notification } from "antd";
import { isWebUri } from "valid-url";
import Linkify from "react-linkify";
import youtubeIcon from "assets/images/youtube.svg";
import instagramIcon from "assets/images/instagram.svg";
import twitterIcon from "assets/images/twitter.svg";
import steemIcon from "assets/images/steemit.svg";
import redditIcon from "assets/images/reddit.svg";
import twitchIcon from "assets/images/twitch.svg";
import mediumIcon from "assets/images/medium.svg";
import otherIcon from "assets/images/other.svg";
import approvedIcon from "assets/images/approved.svg";

const { Option } = Select;

const ChannelItem = props => {
  const { icon, verified } = props;

  return (
    <div className="buzz-channel-item col-on-mobile row-align-start">
      <div className="row-align-center buzz-channel-container">
        <div className="buzz-icon-container">
          <img className="buzz-channel-icon" src={icon} alt="" />
          {true && <img className="overlapped-approved-icon" src={approvedIcon} alt="" />}
        </div>
        <div className="buzz-channel-text">Instagram</div>
      </div>

      <div className="buzz-summary">
        <div className="buzz-link">
          <a target="__blank">https://www.instagram.com/andrew___cho</a>
        </div>

        <div className="buzz-stat-container text-small text-grey">
          {true && (
            <div className="row-align-center">
              <img src={approvedIcon} alt="" />
              <div className="approved-text">Verified channel</div>
            </div>
          )}
          Followers: 12,450
          <br />
          Total number of posts: 105
          <br />
          Average likes: 105.2
          <br />
          Average comments: 15.6
          <br />
          <span>Earning per post (estimation): 1.5K HUNT ($10.5)</span>
        </div>
      </div>
    </div>
  );
};

const BuzzChannels = ({}) => {
  const setUrlInput = () => {};
  const urlInput = "";
  const setSocialChannels = () => {};
  const setSelectValue = () => {};
  const selectValue = "";
  const socialChannels = [];

  return (
    <div className="content-quest">
      <div className="content-title text-black uppercase">
        Register your buzz channels
      </div>
      <div className="text-grey">
        Connect your social accounts and maximise your quest and bounty chances.
        We will evaluate the value of your channel and suggest the best price as
        possible to the makers for you. Once you join in a quest and submit your
        review content later on, your channels will be verified automatically.
        Only the verified channels will be counted for your hunter rank
        calculation, and this will be used for the direct offer feature by
        makers soon.
      </div>
      <div className="channel-add-container">
        <div className="row-space-between">
          <div className="col-on-mobile">
            <Select
              value={"Add Channels"}
              className="select-channel delete"
              onChange={c => setSelectValue(c)}
            >
              <Option value="instagram">Instagram</Option>
              <Option value="twitter">Instagram</Option>
              <Option value="medium">Medium</Option>
              <Option value="reddit">Reddit</Option>
              <Option value="twitch">Twitch</Option>
              <Option value="youtube">YouTube</Option>
              <Option value="others">Others</Option>
            </Select>
            <Input
              addonAfter={
                <div
                  onClick={() => {
                    if (selectValue === "channels" || urlInput === "") return;
                    else if (!isWebUri(urlInput)) {
                      notification["error"]({
                        message:
                          "Please enter a valid url beginning with http:// or https://."
                      });
                      return;
                    }
                    setSocialChannels(
                      socialChannels.concat({
                        channel: selectValue,
                        url: urlInput
                      })
                    );

                    setSelectValue("channels");
                    setUrlInput("");
                  }}
                >
                  Submit
                </div>
              }
              value={urlInput}
              placeholder={"Input URL"}
              onChange={e => {
                setUrlInput(e.target.value);
              }}
            />
          </div>
        </div>
      </div>

      <div className="registered-channels-text text-black">
        Registered Channels
      </div>
      <div className="row-align-center text-blue text-small">
        <div className="hover-link">Refresh data</div>
        <div className="splitter">|</div>
        <div className="hover-link">Manage channels</div>
      </div>

      <ChannelItem icon={instagramIcon} />
      <ChannelItem icon={youtubeIcon} />
      <ChannelItem icon={instagramIcon} />
      <ChannelItem icon={instagramIcon} />
    </div>
  );
};

BuzzChannels.propTypes = {};

BuzzChannels.defaultProps = {};

export default BuzzChannels;
