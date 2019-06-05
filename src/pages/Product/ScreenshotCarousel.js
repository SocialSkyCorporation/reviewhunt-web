import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import test1Img from './test1.png';
import test2Img from './test2.png';
import leftArrowImg from 'assets/images/left-circle.svg';
import rightArrowImg from 'assets/images/right-circle.svg';

class Carousel extends Component {
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
      arrows: false,
      infinite: false,
      variableWidth: true
    };

    return (
      <div className="carousel-container">
        <Slider ref={v => (this.slider = v)} {...settings}>
          <img className="screenshot-img" src={test1Img} alt="" />
          <img className="screenshot-img" src={test2Img} alt="" />
          <img className="screenshot-img" src={test1Img} alt="" />
          <img className="screenshot-img" src={test1Img} alt="" />
          <img className="screenshot-img" src={test2Img} alt="" />
          <img className="screenshot-img" src={test2Img} alt="" />
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

Carousel.propTypes = {};

export default Carousel;
