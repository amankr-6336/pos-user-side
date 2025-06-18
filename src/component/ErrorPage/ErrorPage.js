import React from "react";
import ErrorAnimation from "../../asset/Animation - 1744541304551.json";
import Lottie from "lottie-react";
import "./ErrorPage.scss";

function ErrorPage() {
  return (
    <div className="errorPage">
      <Lottie
        animationData={ErrorAnimation}
        loop={true}
        style={{ width: 300, height: 300, objectFit: "contain" }}
      />
   <h2>Invalid Link  Please scan the QR code again 🤣</h2>
    </div>
  );
}

export default ErrorPage;
