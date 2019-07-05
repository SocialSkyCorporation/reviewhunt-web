import React from "react";
import PropTypes from "prop-types";

const HistoryItem = props => {
  const {noDivider} = props;
  return (
    <>
      <div className="row-align-center history-item">
        <img />
        <div>
          <div className="history-item-title text-big text-black">BARK APP</div>
          <div className="text-small text-grey">Jul 5, 2019 - Aug 4, 2019</div>
          <div className="text-small text-grey">
            <span>$10,500</span> campaign budget was spent.
          </div>
          <div className="text-small text-grey">
            Total of <span>253</span> hunters performed quests, and generated
            230 app store reviews and <span>452</span> buzz content.
          </div>
        </div>
      </div>
      {!noDivider && <div className="divider-line" />}
    </>
  );
};

const HistoryTab = ({}) => {
  return (
    <div className="content-history">
      <div className="content-title text-black">Campaign History</div>
      <HistoryItem />
      <HistoryItem noDivider/>
    </div>
  );
};

HistoryTab.propTypes = {};

HistoryTab.defaultProps = {};

export default HistoryTab;
