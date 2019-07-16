import React, { useRef, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Icon } from "antd";
import CampaignPreview from "./CampaignPreview";
import SimpleButton from "components/SimpleButton";
import NewCampaignContext, {STEP_CHECKOUT, STEP_CAMPAIGN_BUDGET} from "contexts/NewCampaignContext";

const Step5 = ({}) => {
  const dummyRef = useRef(null);
  const [dummyStyle, setDummyStyle] = useState({});
  const {setStep} = useContext(NewCampaignContext);

  return (
    <div className="campaign-step">
      <div className="text-grey">Step 5 of 5</div>
      <div className="step-title text-black">CONFIRM YOUR CAMPAIGN</div>
      <div ref={dummyRef} style={{ ...dummyStyle, width: "100%" }} />
      <CampaignPreview dummyRef={dummyRef} setDummyStyle={setDummyStyle} />
      <div className="save-next-container step5">
        <div className="row-align-center text-grey" onClick={() => setStep(STEP_CAMPAIGN_BUDGET)}>
          <Icon type="left" />
          <div>Back</div>
        </div>
        <SimpleButton text={"Proceed to Checkout"} onClick={() => setStep(STEP_CHECKOUT)} style={{minWidth: 200}}/>
      </div>
    </div>
  );
};

Step5.propTypes = {};

Step5.defaultProps = {};

export default Step5;
