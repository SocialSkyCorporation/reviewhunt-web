import React, { useState, useRef, useCallback } from "react";
import Slider from "react-slick";
import test1Img from "./test1.png";
import leftArrowImg from "assets/images/left-circle.svg";
import rightArrowImg from "assets/images/right-circle.svg";
import { CampaignConsumer } from "contexts/CampaignContext";

const QuestCarouselItem = ({
  bounty_amount,
  index,
  image,
  description,
  criteria,
  title
}) => {
  return (
    <div className="quest-carousel-item">
      <div className="row-align-center row-space-between">
        <div>
          <div className="quest-item-id text-black">QUEST {index + 1}</div>
          <div className="quest-item-title text-black">{title}</div>
        </div>
        <div className="bounty-text text-black">${bounty_amount}</div>
      </div>
      <div className="quest-description-container">
        <div className="quest-description text-grey">{description}</div>
        <img className="quest-image" src={image} alt="" />
      </div>
    </div>
  );
};

const QuestCarousel = props => {
  const sliderRef = useRef();

  const next = useCallback(() => {
    sliderRef.current.slickNext();
  }, []);

  const prev = useCallback(() => {
    sliderRef.current.slickPrev();
  }, []);

  const settings = {
    className: "slider variable-width",
    adaptiveHeight: true,
    dots: false,
    infinite: false,
    arrows: false,
    variableWidth: true
  };

  return (
    <CampaignConsumer>
      {({ currentCampaign }) => {
        return (
          <div className="carousel-container">
            <Slider ref={sliderRef} {...settings}>
              {currentCampaign.quests && currentCampaign.quests.map((campaign, index) => (
                <QuestCarouselItem key={campaign.id} {...campaign} index={index} />
              ))}
            </Slider>
            <img
              className="carousel-control-button left"
              src={leftArrowImg}
              onClick={prev}
              alt=""
            />
            <img
              className="carousel-control-button right"
              src={rightArrowImg}
              onClick={next}
              alt=""
            />
          </div>
        );
      }}
    </CampaignConsumer>
  );
};

export default QuestCarousel;
