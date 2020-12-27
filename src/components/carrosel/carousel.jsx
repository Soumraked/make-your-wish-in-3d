import React from "react";

import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';

const AutoplaySlider = withAutoplay(AwesomeSlider);

const slider = (
  <AutoplaySlider
    play={true}
    cancelOnInteraction={false} // should stop playing on user interaction
    interval={6000}
    style={{ marginTop:"1em", height:"20vw" ,zIndex:-1 }}>
      <div data-src="https://firebasestorage.googleapis.com/v0/b/u-app-3100e.appspot.com/o/imagen_2020-12-26_201225.png?alt=media&token=00ccb76c-35b6-459a-af61-89eee216938c" />
      <div data-src="https://firebasestorage.googleapis.com/v0/b/u-app-3100e.appspot.com/o/jewelry_desktop.png?alt=media&token=5d7f62a1-c8bb-4d7f-ba1b-c181845f7486" />
      <div data-src="https://firebasestorage.googleapis.com/v0/b/u-app-3100e.appspot.com/o/prototyping_desktop.png?alt=media&token=9ef21172-f7ec-44f4-8063-bed88c18a900" />
    
  </AutoplaySlider>
);

export default function Carousel() {
  return (<>
  {slider}
  </>
  );
}


