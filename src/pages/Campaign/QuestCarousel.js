import React, { useRef, useCallback } from "react";
import Slider from "react-slick";
import leftArrowImg from "assets/images/left-circle.svg";
import rightArrowImg from "assets/images/right-circle.svg";

const QuestCarouselItem = ({
  bounty_base,
  bounty_max,
  index,
  image,
  description,
  criteria,
  title
}) => {
  const bounty = bounty_max !== bounty_base ? `$${bounty_base} - $${bounty_max}` : `$${bounty_max}`;
  return (
    <div className="quest-carousel-item">
      <div className="row-align-center row-space-between">
        <div>
          <div className="quest-item-id text-black">QUEST {index + 1}</div>
          <div className="quest-item-title text-black">{title}</div>
          <div className="bounty-tag primary-gradient text-black">{bounty}</div>
        </div>
      </div>
      <div className="row-space-between quest-description-container">
        <div className="quest-description text-grey text-small">{description}</div>
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
    adaptiveHeight: false,
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
