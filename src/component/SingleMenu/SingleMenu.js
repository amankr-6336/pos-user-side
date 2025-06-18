import React from "react";
import "./SingleMenu.scss";
import dish from "../../../asset/dishimg.png";
import { TbBowlSpoonFilled } from "react-icons/tb";
import { PiEmpty } from "react-icons/pi";
function SingleMenu({ data, onSet }) {
  return (
    <div
      className={`single-menu ${data.isStock ? "stock" : "out-of-stock"}`}
      onClick={() => onSet(data)}
    >
      <div className="dish-img">
        <TbBowlSpoonFilled style={{ width: "100%", fontSize: "5rem" }} />
      </div>
      <div className="name-price">
        <p id="name">{data?.name}</p>
      </div>
     
      <p id="price">₹ {data?.price}</p>
      {!data.isStock && <PiEmpty id="out-of-stock" />}
      
    </div>
  );
}

export default SingleMenu;
