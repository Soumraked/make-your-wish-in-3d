import React from "react";

import Container from "@material-ui/core/Container";

import AwesomeSlider from 'react-awesome-slider';
import AwesomeSliderStyles from 'react-awesome-slider/src/styles';

const slider = (
  <AwesomeSlider cssModule={AwesomeSliderStyles} style={{ marginTop:"1em" }}>
      <div data-src="https://firebasestorage.googleapis.com/v0/b/back-f0378.appspot.com/o/Carousel%2F7.jpg?alt=media" />
      <div data-src="https://firebasestorage.googleapis.com/v0/b/back-f0378.appspot.com/o/Carousel%2F1.jpg?alt=media" />
      <div data-src="https://firebasestorage.googleapis.com/v0/b/back-f0378.appspot.com/o/Carousel%2F2.jpg?alt=media" />
  </AwesomeSlider>
);

export default function Carousel() {

  return (<Container>
  {slider}
  </Container>);
}


