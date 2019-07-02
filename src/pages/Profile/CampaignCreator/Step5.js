import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import CampaignPreview from "./CampaignPreview";

const Step5 = ({}) => {
  const dummyRef = useRef(null);
  const [dummyStyle, setDummyStyle] = useState({});

  return (
    <div className="campaign-step">
      <div className="text-grey text-small">Step 5 of 5</div>
      <div className="step-title text-black">CONFIRM YOUR CAMPAIGN</div>
      <div ref={dummyRef} style={{ ...dummyStyle, width: "100%" }} />
      <CampaignPreview dummyRef={dummyRef} setDummyStyle={setDummyStyle} />
    </div>
  );
};

Step5.propTypes = {};

Step5.defaultProps = {};

export default Step5;
