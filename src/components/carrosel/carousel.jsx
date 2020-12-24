import React from "react";
import styled from "styled-components";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import AwesomeSlider from 'react-awesome-slider';
i

const slider = (
  <AwesomeSlider cssModule={AwesomeSliderStyles}>
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


