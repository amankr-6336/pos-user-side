import React, { useEffect, useState } from "react";
import "./Header.scss";
import { BsCart4 } from "react-icons/bs";
import Dialog from "../common/dialog/Dialog";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../cartItem/CartItem";
import Input from "../common/input/Input";
import { axiosClient } from "../../utils/AxiosClient";
import { useParams } from "react-router-dom";
import { orderConfirmed } from "../../redux/order/OrderReducer";
import { io } from "socket.io-client";
import { resetCart } from "../../redux/Cart/CartReducer";
import OtpComponent from "../OtpComponent/OtpComponent";
import { BiSolidBellRing } from "react-icons/bi";
import  FallbackrestroLogo from '../../asset/optimized_restaurant_logo.png'

function Header({ table }) {
  const [otp, setOtp] = useState(null);
  const [cartDialog, setCartDialog] = useState(false);
  const [cartCheckout, setCartCheckout] = useState(false);
  const [otpdialog, setotpdialog] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("+91");
  const [orderResponse, setOrderResponse] = useState(null);
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  const cart = useSelector((state) => state.CartReducer.cart);
  const order = useSelector((state) => state.OrderReducer.order);
  console.log(order);
  console.log(orderResponse);

  let totalAmount = 0;
  cart.forEach((item) => (totalAmount += item.quantity * item.price));

  console.log(table);

  const simplifiedCart = cart.map((item) => ({
    menuItem: item._id,
    quantity: item.quantity,
  }));

  function handleCartDailogClose() {
    setCartDialog(false);
  }
  function handleCloseCart() {
    setCartCheckout(false);
  }
  function handlecloseOtpdialog() {
    setotpdialog(false);
  }
  function handleProcedToCheckout() {
    setCartCheckout(true);
    setCartDialog(false);
  }

  useEffect(() => {
    const socketInstance = io("http://localhost:4001"); // Replace with your server URL
    setSocket(socketInstance);

    // Cleanup on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  async function handleConfirmOrder() {
    console.log(cart);
    console.log(name, number);
    try {
      const response = await axiosClient.post("/order/create-order", {
        tableId: table.table._id,
        restaurantId: params.restroId,
        items: simplifiedCart,
        name: name,
        number: number,
      });
      console.log(response);
      setOrderResponse(response.data);

      if (socket && response) {
        socket.emit("orderPlaced", response.data); // Send order details to the server
      }

      if (response) {
        dispatch(orderConfirmed(response?.data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setCartDialog(false);
      setCartCheckout(false);
      setotpdialog(false);
      setName("");
      setNumber("+91");
      dispatch(resetCart());
    }
  }

  // open Otp dialog
  async function handleOtpsection() {
    try {
      const response = await axiosClient.post("/otp/send-otp", {
        phone: number,
      });
      console.log(response);
      if (response) {
        setCartCheckout(false);
        setotpdialog(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function confirmOrder() {
    try {
      const response = await axiosClient.post("/otp/verify-otp", {
        phone: number,
        otp: otp,
      });

      if (response) {
        handleConfirmOrder();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCalltorestro() {
    try {
      const response = await axiosClient.post(
        "/notification/query-notification",
        { restaurantId: params.restroId, tableNumber: params.tableId }
      );
      console.log(response);

      if (socket && response) {
        console.log("entered");
        socket.emit("newnotification", response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="header">
      <div className="name">
         <img  src={FallbackrestroLogo}  alt="" />
        <p>{table?.restro?.name}</p>
      </div>

      <div className="ring-cart">
        <div className="call">
          <BiSolidBellRing onClick={handleCalltorestro} />
        </div>

        <div className="cart">
          <BsCart4 onClick={() => setCartDialog(true)} />
          {cart.length > 0 && (
            <span>
              <p>{cart.length}</p>
            </span>
          )}
        </div>
      </div>

      {cartDialog && (
        <Dialog
          isOpen={cartDialog}
          onClose={handleCartDailogClose}
          title="Cart"
          confirm={
            cart.length
              ? { text: "Checkout", onConfirm: handleProcedToCheckout }
              : {}
          }
        >
          {cart.length > 0 ? (
            <>
              <div className="cart-header">
                <div className="menu-name">
                  <p>Item Name</p>
                </div>
                <div className="quantity">
                  <p>Quantity</p>
                </div>
                <div className="price">
                  <p>Price</p>
                </div>
              </div>
              {cart.map((item, index) => (
                <CartItem key={index} data={item} />
              ))}
              <div className="total">
                <p id="total-header">Total</p>
                <p id="amount">₹ {totalAmount}</p>
              </div>
            </>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </Dialog>
      )}

      {cartCheckout && (
        <Dialog
          isOpen={cartCheckout}
          onClose={handleCloseCart}
          title="User Info"
          confirm={{ text: "Send OTP", onConfirm: handleOtpsection }}
        >
          <Input
            label="User Name"
            name="name"
            value={name}
            onChange={setName}
          />
          <Input
            label="User Number"
            name="number"
            value={number}
            onChange={setNumber}
          />
        </Dialog>
      )}
      {otpdialog && (
        <Dialog
          isOpen={otpdialog}
          onClose={handlecloseOtpdialog}
          title={"Enter OTP"}
          confirm={{ text: "Verify", onConfirm: confirmOrder }}
        >
          <div className="otp-heading">
            <h5>OTP Verification</h5>
            <p>Enter OTP code sent to {number}</p>
          </div>
          <OtpComponent length={4} number={number} setotp={setOtp} />
        </Dialog>
      )}
    </div>
  );
}

export default Header;
