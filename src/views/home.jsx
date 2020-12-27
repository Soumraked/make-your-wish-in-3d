
import React from "react";
import Carousel from "../components/carrosel/carousel";
import CustomizedDialogs from "../views/popup";
function Home() {

  return (
    <>
      <CustomizedDialogs/>
      <div>
       <Carousel/>
      </div>
    </>
    );

}

export default Home;
