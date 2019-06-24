import React from "react";
import PropTypes from "prop-types";
import { TextInput, Screenshots, ProductLinks } from "./FormTypes";
import SimpleButton from "components/SimpleButton";
import { NewCampaignConsumer } from "./NewCampaignContext";

const Step1 = ({}) => {
  return (
    <NewCampaignConsumer>
      {({ setStep }) => {
        return (
          <div className="campaign-step">
            <div className="text-grey">Step 1 of 5</div>
            <div className="step-title text-black">PRODUCT DESCRIPTION</div>
            <TextInput title={"Product Name"}/>
            <TextInput title={"One Sentence"}/>
            <TextInput title={"Description"}/>
            <Screenshots title={"Screenshots"}/>
            <ProductLinks />
            <div className="save-next-container">
              <SimpleButton onClick={() => setStep(2)} text={"Save and Next"} />
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
