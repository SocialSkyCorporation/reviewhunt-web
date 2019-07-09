import React, { useState, useContext } from "react";
import { Input, Icon } from "antd";
import PropTypes from "prop-types";
import { TextInput, Screenshots, ProductLinks } from "components/FormTypes";
import SimpleButton from "components/SimpleButton";
import NewCampaignContext from "contexts/NewCampaignContext";
import websiteImg from "assets/images/website.svg";
import appstoreImg from "assets/images/appstore.svg";
import playstoreImg from "assets/images/playstore.svg";

const Step1 = ({}) => {
  const { createCampaign, campaignInfo, updateCampaignInfo } = useContext(
    NewCampaignContext
  );

  const {
    product_name,
    short_description,
    description,
    images,
    urls
  } = campaignInfo;

  return (
    <div className="campaign-step">
      <div className="text-grey text-small">Step 1 of 5</div>
      <div className="step-title text-black">PRODUCT DESCRIPTION</div>
      <TextInput
        title={"Product Name"}
        value={product_name}
        setValue={value => updateCampaignInfo("product_name", value)}
      />
      <TextInput
        title={"One Sentence"}
        value={short_description}
        setValue={value => updateCampaignInfo("short_description", value)}
      />
      <TextInput
        title={"Description"}
        value={description}
        setValue={value => updateCampaignInfo("description", value)}
      />
      <Screenshots
        title={"Screenshots"}
        onChange={files => updateCampaignInfo("images", files)}
        maxBytes={10000000}
        images={images}
      />
      <div className="title-input-container">
        <div className="row-space-between title-input-header text-grey">
          <div>Product Links</div>
        </div>
        <Input
          addonBefore={<img src={websiteImg} alt="" />}
          className="title-input-box title-icon-input-box text-black"
          placeholder="Website URL"
          value={urls['website']}
          onChange={e => updateCampaignInfo("urls", {...urls, website: e.target.value})}
        />
        <Input
          addonBefore={<img src={appstoreImg} alt="" />}
          className="title-input-box title-icon-input-box text-black"
          placeholder="App Store"
          value={urls['appstore']}
          onChange={e => updateCampaignInfo("urls", {...urls, appstore: e.target.value})}
        />
        <Input
          addonBefore={<img src={playstoreImg} alt="" />}
          className="title-input-box title-icon-input-box text-black"
          placeholder="Google Play"
          value={urls['playstore']}
          onChange={e => updateCampaignInfo("urls", {...urls, playstore: e.target.value})}
        />
      </div>
      <div className="save-next-container">
        <div />
        <SimpleButton onClick={() => createCampaign()} text={"Save and Next"} />
      </div>
    </div>
  );
};

Step1.propTypes = {};

Step1.defaultProps = {};

export default Step1;
