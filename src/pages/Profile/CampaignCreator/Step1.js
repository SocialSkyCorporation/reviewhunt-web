import React, { useState } from "react";
import { Input, Icon } from "antd";
import PropTypes from "prop-types";
import { TextInput, Screenshots, ProductLinks } from "./FormTypes";
import SimpleButton from "components/SimpleButton";
import { NewCampaignConsumer } from "contexts/NewCampaignContext";
import websiteImg from "assets/images/website.svg";
import appstoreImg from "assets/images/appstore.svg";
import playstoreImg from "assets/images/playstore.svg";

const Step1 = ({}) => {
  const [product_name, setProductName] = useState("a");
  const [short_description, setShortDescription] = useState("b");
  const [description, setDescription] = useState("c");
  const [images, setImages] = useState([]);
  const [appstore, setAppstore] = useState("d");
  const [playstore, setPlaystore] = useState("e");
  const [website, setWebsite] = useState("f");

  return (
    <NewCampaignConsumer>
      {({ setStep, createCampaign }) => {
        return (
          <div className="campaign-step">
            <div className="text-grey">Step 1 of 5</div>
            <div className="step-title text-black">PRODUCT DESCRIPTION</div>
            <TextInput
              title={"Product Name"}
              value={product_name}
              setValue={setProductName}
            />
            <TextInput
              title={"One Sentence"}
              value={short_description}
              setValue={setShortDescription}
            />
            <TextInput
              title={"Description"}
              value={description}
              setValue={setDescription}
            />
            <Screenshots title={"Screenshots"} onChange={files => setImages(files)} maxBytes={10000000} />
            <div className="title-input-container">
              <div className="row-space-between title-input-header text-grey">
                <div>Product Links</div>
              </div>
              <Input
                addonBefore={<img src={websiteImg} alt="" />}
                className="title-input-box title-icon-input-box text-black"
                placeholder="Website URL"
                value={website}
                onChange={e => setWebsite(e.target.value)}
              />
              <Input
                addonBefore={<img src={appstoreImg} alt="" />}
                className="title-input-box title-icon-input-box text-black"
                placeholder="App Store"
                value={appstore}
                onChange={e => setAppstore(e.target.value)}
              />
              <Input
                addonBefore={<img src={playstoreImg} alt="" />}
                className="title-input-box title-icon-input-box text-black"
                placeholder="Google Play"
                value={playstore}
                onChange={e => setPlaystore(e.target.value)}
              />
            </div>
            <div className="save-next-container">
              <SimpleButton
                onClick={() =>
                  createCampaign({
                    product_name,
                    short_description,
                    description,
                    urls: {
                      appstore,
                      playstore,
                      website
                    }
                  }, images)
                }
                text={"Save and Next"}
              />
            </div>
          </div>
        );
      }}
    </NewCampaignConsumer>
  );
};

Step1.propTypes = {};

Step1.defaultProps = {};

export default Step1;
