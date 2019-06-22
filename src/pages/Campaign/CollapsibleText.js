import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import downArrowImg from "assets/images/down-arrow-blue.svg";

const CollapsibleText = ({ text, minHeight = 50 }) => {
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);
  const [showVisible, setShowVisible] = useState(true);

  useEffect(() => {
    const height = document.getElementById("show-more-desc").clientHeight;
    if(height < minHeight) {
      setShowVisible(false);
    } else {
      setCollapsed(true)
    }
  }, [minHeight]);

  return (
    <>
      <div
        id="show-more-desc"
        className="show-more-desc"
        style={{ height: showVisible && collapsed ? minHeight : "auto" }}
      >
        {text}
        {showVisible && collapsed && (
          <div className="show-more-white-gradient" />
        )}
      </div>

      {showVisible && (
        <div
          className="show-more-container hover-link"
          onClick={() => setCollapsed(!collapsed)}
        >
          <div className="show-more">
            {t(collapsed ? "product.show_more" : "product.show_less")}
          </div>
          <img
            className={`down-arrow ${!collapsed ? "rotated" : "unrotated"}`}
            src={downArrowImg}
            alt=""
          />
        </div>
      )}
    </>
  );
};

CollapsibleText.propTypes = {
  text: PropTypes.string,
  minHeight: PropTypes.number
};

CollapsibleText.defaultProps = {};

export default CollapsibleText;
