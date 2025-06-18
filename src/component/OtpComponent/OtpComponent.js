import React, { useEffect, useRef, useState } from "react";
import "./OtpComponent.scss";

function OtpComponent({ length ,number ,setotp }) {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputrefs=useRef([]);

  useEffect(()=>{
    if(inputrefs.current[0]){
        inputrefs.current[0].focus();
    }
  },[])

  const handleChange = (index,e) => {
    const value=e.target.value;
    if(isNaN(value)) return;

    const newOtp=[...otp];
    newOtp[index]=value.substring(value.length-1);
    setOtp(newOtp);

    const combinedOtp=newOtp.join("");

    if(combinedOtp.length===length){
        console.log(combinedOtp);
        setotp(combinedOtp);
    }

    if(value && index<length-1 && inputrefs.current[index+1]){
        inputrefs.current[index+1].focus();
    }

  };
  const handleClick = (index) => {
    inputrefs.current[index].setSelectionRange(1,1);

    if(index>0 && !otp[index-1]){
        inputrefs.current[otp.indexOf("")].focus();
    }
  };
  const handleKeyDown = (index,e) => {
    if(e.key==="Backspace" && !otp[index] && index>0 && inputrefs.current[index-1]){
        inputrefs.current[index-1].focus();
    }
  };
  return (
    <div className="otp-section">
      
      {otp.map((value, index) => {
        return (
          <input
            type="text"
            key={index}
            ref={(input) => (inputrefs.current[index] = input)}
            value={value}
            onChange={(e) => handleChange(index, e)}
            onClick={() => handleClick(index)}
            onKeyDown={(e)=>handleKeyDown(index,e)}
            className="otpinput"
          />
        );
      })}
    </div>
  );
}

export default OtpComponent;
