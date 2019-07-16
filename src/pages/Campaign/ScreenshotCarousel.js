import React, { Component } from "react";
import Slider from "react-slick";
import leftArrowImg from "assets/images/left-circle.svg";
import rightArrowImg from "assets/images/right-circle.svg";

class Carousel extends Component {
  next = () => {
    this.slider.slickNext();
  };

  prev = () => {
    this.slider.slickPrev();
  };

  render() {
    const settings = {
      className: "slider variable-width",
      adaptiveHeight: false,
      dots: false,
      arrows: false,
      infinite: false,
      variableWidth: true
    };

    const { images } = this.props;

    return (
      <div className="carousel-container">
        <Slider ref={v => (this.slider = v)} {...settings}>
          {images.map((image, index) => (
            <img key={index} className="screenshot-img" src={image} alt="" />
          ))}
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

export default Carousel;
