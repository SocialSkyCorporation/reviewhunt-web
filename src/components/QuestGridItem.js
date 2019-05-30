import React from "react";
import moneySvg from "assets/images/money-single.svg";
import hunterSvg from "assets/images/hunter-single.svg";
import questSvg from "assets/images/quest-single.svg";

export default function QuestGridItem() {
  return (
    <div className="quest-grid-item">
      <div className="quest-badge">
        <img src={questSvg} />
        <p>3 QUESTS</p>
      </div>

      <img className="top-container" src="https://picsum.photos/200/300" />

      <div className="bottom-container">
        <div className="progress-bar">
          <div className="progress-bar-filled" />
        </div>

        <div className="text-container">
          <h1 className="title">
            aoweifjawopijefpiwajefpiwajefpiajwpifjwapeijfpi
          </h1>
          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pretium
            pretium tempor.
          </p>
        </div>
      </div>
    </div>
  );
}
