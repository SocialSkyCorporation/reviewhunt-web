import React, { useRef, useCallback } from "react";
import Slider from "react-slick";
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
  const { quests } = props;
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
    <div className="carousel-container">
      <Slider ref={sliderRef} {...settings}>
        {quests.map((quest, index) => (
          <QuestCarouselItem key={quest.id || index} {...quest} index={index} />
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
};

QuestCarousel.defaultProps = {
  quests: []
};

export default QuestCarousel;
