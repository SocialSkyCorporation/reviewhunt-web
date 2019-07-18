import React, { useState, useEffect, useContext, useMemo } from "react";
import PropTypes from "prop-types";
import { Avatar, Spin, Input, Select, Icon, notification } from "antd";
import { isWebUri } from "valid-url";
import AuthContext from "contexts/AuthContext";
import AppContext from "contexts/AppContext";
import CircularProgress from "components/CircularProgress";
import Linkify from "react-linkify";
import approvedIcon from "assets/images/approved.svg";
import deleteIcon from "assets/images/delete.svg";
import { availableChannels } from "utils/constants";
import { numberWithCommas } from "utils/helpers/numberFormatHelper";
import _ from "lodash";

const { Option } = Select;

function ChannelItem(props) {
  const { index, data, onDeleteClicked, editMode } = props;
  const { huntPerUsd } = useContext(AppContext);
  const { refreshingBuzz } = useContext(AuthContext);
  const {
    url,
    icon,
    estimating,
    channel_type,
    profile_image,
    name,
    user_name,
    engagement_rate,
    follower_count,
    is_verified,
    price_per_content
  } = data;

  let huntReward = null;
  let usdReward = null;

  if (price_per_content && !refreshingBuzz) {
    huntReward = numberWithCommas(
      (parseFloat(price_per_content) / huntPerUsd).toFixed(2)
    );
    usdReward = numberWithCommas(parseFloat(price_per_content).toFixed(2));
  }

  return useMemo(() => {
    return (
      <div className="buzz-channel-item col-on-mobile row-align-start">
        <div className="row-align-center buzz-channel-container">
          <div className="buzz-icon-container">
            <img
              className="buzz-channel-icon"
              src={
                profile_image
                  ? profile_image
                  : icon
              }
              alt=""
            />
            {is_verified && (
              <img
                className="overlapped-approved-icon"
                src={approvedIcon}
                alt=""
              />
            )}
          </div>
          <div>
          <div className="buzz-channel-text text-grey">{channel_type}</div>
          <div className="buzz-channel-text text-black">{name || user_name}</div>
          </div>
        </div>

        <div className="buzz-summary">
          <div className="row-align-center">
            <div className="buzz-link">
              <a target="__blank">{url}</a>
            </div>
            {editMode && (
              <img
                onClick={onDeleteClicked}
                className="buzz-delete-icon"
                src={deleteIcon}
                alt=""
              />
            )}
          </div>

          <div className="buzz-stat-container text-small text-grey">
            <Spin spinning={estimating || refreshingBuzz} tip="Estimating...">
              <div>
                {is_verified && (
                  <div className="row-align-center">
                    <img src={approvedIcon} alt="" />
                    <div className="approved-text">Verified channel</div>
                  </div>
                )}
                Followers: {follower_count || 0}
                <br />
                Engagement Rate:{" "}
                {engagement_rate ? (engagement_rate * 100).toFixed(2) : 0}%
                <br />
                Earning per post (estimation):{" "}
                <span>
                  {huntReward || 0} HUNT (${usdReward || 0})
                </span>
              </div>
            </Spin>
          </div>
        </div>
      </div>
    );
  }, [price_per_content, huntPerUsd, refreshingBuzz, editMode]);
}
const BuzzChannels = ({}) => {
  const [editMode, setEditMode] = useState(false);
  const [selectValue, setSelectValue] = useState("Channels");
  const [urlInput, setUrlInput] = useState("https://instagram.com/sebayaki");

  const {
    loading,
    refreshBuzz,
    socialChannels,
    addSocialChannel,
    setSocialChannels,
    getSocialChannels,
    deleteSocialChannel
  } = useContext(AuthContext);

  useEffect(() => {
    getSocialChannels();
  }, []);

  if (loading) {
    return (
      <div className="content-quest">
        <CircularProgress />
      </div>
    );
  }
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
              value={selectValue}
              className="select-channel delete"
              onChange={c => setSelectValue(c)}
            >
              {availableChannels.map(({ label, value }, index) => {
                return (
                  <Option key={value} value={value}>
                    {label}
                  </Option>
                );
              })}
            </Select>
            <Input
              addonAfter={
                <div
                  onClick={() => {
                    if (selectValue === "Channels" || urlInput === "") return;
                    else if (!isWebUri(urlInput)) {
                      notification["error"]({
                        message:
                          "Please enter a valid url beginning with http:// or https://."
                      });
                      return;
                    }

                    const value = _.find(availableChannels, [
                      "value",
                      selectValue
                    ]);

                    addSocialChannel({
                        ...value,
                        url: urlInput,
                        estimating: true
                    })

                    setSelectValue("Channels");
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
        <div className="hover-link" onClick={refreshBuzz}>
          Refresh data
        </div>
        <div className="splitter">|</div>
        <div className="hover-link" onClick={() => setEditMode(!editMode)}>
          {editMode ? "Done" : "Manage channels"}
        </div>
      </div>

      {editMode && (
        <div className="please-note-warning text-grey text-small">
          Please note that your channel data will also be removed when you
          delete the channel, which is to calculate your top hunter performance
          score.
        </div>
      )}
      {socialChannels.map((data, i) => (
        <ChannelItem
          key={i}
          onDeleteClicked={() => deleteSocialChannel(i)}
          index={i}
          data={data}
          editMode={editMode}
        />
      ))}
    </div>
  );
};

BuzzChannels.propTypes = {};

BuzzChannels.defaultProps = {};

export default BuzzChannels;
