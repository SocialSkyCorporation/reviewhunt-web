import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import test1Img from './test1.png';
import leftArrowImg from 'assets/images/left-circle.svg';
import rightArrowImg from 'assets/images/right-circle.svg';

const QuestCarouselItem = props => {
  return (
    <div className="quest-carousel-item">
      <div className="row-align-center row-space-between">
        <div>
          <div className="quest-item-id text-black">QUEST {props.id}</div>
          <div className="quest-item-title text-black">Make your first bark.</div>
        </div>
        <div className="bounty-text text-black">$2</div>
      </div>
      <div className="quest-description-container">
        <div className="quest-description text-grey">
          Bark transforms people nearby into fun barking dogs. Every user
          chooses one of the 8 different dog breeds and chats with other barkers
          by communicating like dogs. Make your first bark on your location, and
          see how other dogs (users) barking back to you. Take some good
          screenshot of your barking situation.
        </div>
        <img className="quest-image" src={test1Img} alt=""/>
      </div>
    </div>
  );
};

class QuestCarousel extends Component {
  next = () => {
    this.slider.slickNext();
  };

  prev = () => {
    this.slider.slickPrev();
  };

  render() {
    const settings = {
      className: 'slider variable-width',
      adaptiveHeight: true,
      dots: false,
      infinite: false,
      arrows: false,
      variableWidth: true
    };

    return (
      <div className="carousel-container">
        <Slider ref={v => (this.slider = v)} {...settings}>
          <QuestCarouselItem id={1}/>
          <QuestCarouselItem id={2}/>
          <QuestCarouselItem id={3}/>
          <QuestCarouselItem id={4}/>
        </Slider>
        <img
          className="carousel-control-button left"
          src={leftArrowImg}
          onClick={this.prev}
          alt=""
        />
        <img
          className="carousel-control-button right"
          src={rightArrowImg}
          onClick={this.next}
          alt=""
        />
      </div>
    );
  }
}

QuestCarousel.propTypes = {};

export default QuestCarousel;
