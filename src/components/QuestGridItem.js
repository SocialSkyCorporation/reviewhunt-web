import React from 'react';
import { Link } from 'react-router-dom';
import moneySvg from 'assets/images/money-single.svg';
import hunterSvg from 'assets/images/hunter-single.svg';
import questSvg from 'assets/images/quest-single.svg';
import ProgressBar from 'components/ProgressBar';

const QuestGridItem = () => {
  return (
    <Link to="/product">
      <div className="quest-grid-item">
        <div className="quest-badge">
          <img src={questSvg} alt=""/>
          <p>3 QUESTS</p>
        </div>

        <img className="top-container" src="https://picsum.photos/200/300" alt="" />

          <ProgressBar height={10} progress={20} dark />

        <div className="bottom-container">

          <div className="text-container">
            <h1 className="title">
              aoweifjawopijefpiwajefpiwajefpiajwpifjwapeijfpi
            </h1>
            <p className="description two-lines">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
              pretium pretium tempor. 
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
              pretium pretium tempor. 
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
              pretium pretium tempor. 
            </p>
          </div>

          <div className="row-space-between">
            <div className="row-align-center">
              <img className="grid-item-icon" src={moneySvg} alt=""/>
              <div className="bounty-text-container">
                <div className="subheader text-black">$10,500</div>
                <div className="subtext text-grey">Total Bounty Fund</div>
              </div>
            </div>

            <div className="vertical-divider"/>

            <div className="row-align-center">
              <img className="grid-item-icon" src={hunterSvg} alt=""/>
              <div className="bounty-text-container">
                <div className="subheader text-black">35 / 150</div>
                <div className="subtext text-grey">Hunters on Quest</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default QuestGridItem;
