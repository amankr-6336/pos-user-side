import React from "react";
import './CartItem.scss'
import { useDispatch, useSelector } from "react-redux";
import { addToCart,removeFromCart } from "../../redux/Cart/CartReducer";

function CartItem({ data }) {
  const dispatch=useDispatch()
  const cart = useSelector((state) => state.CartReducer.cart);
  
  console.log(data);
  return (
    <div className="cartItem">
      <div className="menu-name">
        <p>{data?.name}</p>
      </div>
      <div className="quantity">
        <button onClick={() => dispatch(removeFromCart(data))}>-</button>
        <span>{data?.quantity}</span>
        <button onClick={() => dispatch(addToCart(data))}>+</button>
      </div>
      <div className="price">
       <p>₹ {data?.price*data?.quantity}</p>
      </div>
    </div>
  );
}

export default CartItem;
