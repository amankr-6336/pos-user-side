import React from "react";
import LoadingAnimation from "../../asset/Animation - 1744622999518.json";
import Lottie from "lottie-react";
import './Loading.scss'

function Loading() {
  return (
    <div className="errorPage">
      <Lottie
        animationData={LoadingAnimation}
        loop={true}
        style={{ width: 200, height: 200, objectFit: "contain" }}
      />
    </div>
  );
}

export default Loading;
