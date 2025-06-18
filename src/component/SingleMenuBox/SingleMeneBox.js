import React from "react";
import "./SingleMenuBox.scss";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/Cart/CartReducer";

function SingleMeneBox({ data }) {
  const dispatch = useDispatch();

  const isLong = data?.description?.length > 50;
  const displayedTextDescription =  data?.description?.substring(0, 50) + (isLong ? "..." : "");

  const cart = useSelector((state) => state.CartReducer.cart);

  const cartItem = cart.find((item) => item._id === data._id);

  return (
    <div className="single-menu-box">
      <div className="menu-img">
        <img src={data.image.optimized} alt="" />
      </div>
      <div className="menu-info">
        <div className="menu-name">
          <p>{data?.name}</p>
        </div>
        <div className="menu-description">
          <p>{displayedTextDescription}</p>
        </div>
        <div className="price-and-button">
          <p>₹ {data?.price}</p>
          {cartItem ? (
            <div className="quantity-controls">
              <button onClick={() => dispatch(removeFromCart(data))}>-</button>
              <span>{cartItem.quantity}</span>
              <button onClick={() => dispatch(addToCart(data))}>+</button>
            </div>
          ) : (
            <button onClick={() => dispatch(addToCart(data))}>+</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleMeneBox;
