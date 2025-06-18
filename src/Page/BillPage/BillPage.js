import React from "react";

const OrderDetails = ({ response }) => {
  const handlePrint = (type) => {
    const printableElement = document.getElementById(type);
    const newWindow = window.open("", "_blank");
    newWindow.document.write(printableElement.innerHTML);
    newWindow.document.close();
    newWindow.print();
  };

  return (
    <div>
      <h1>Order Details</h1>
      {/* Order Section */}
      <div id="order">
        <h2>Bill</h2>
        <p><strong>Table:</strong> {response.order.table}</p>
        <p><strong>User:</strong> {response.order.user}</p>
        <p><strong>User Number:</strong> {response.order.userNumber}</p>
        <p><strong>Total Price:</strong> {response.order.totalPrice}</p>
        <p><strong>Status:</strong> {response.order.status}</p>
        <h3>Items:</h3>
        <ul>
          {response.order.items.map((item) => (
            <li key={item._id}>
              <p>Menu Item: {item.menuItem}</p>
              <p>Quantity: {item.quantity}</p>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={() => handlePrint("order")}>Print Bill</button>

      {/* KOT Section */}
      <div id="kot">
        <h2>KOT</h2>
        {response.kots.map((kotData, index) => (
          <div key={index}>
            <p><strong>Category:</strong> {kotData.category}</p>
            <p><strong>Table:</strong> {kotData.kot.table}</p>
            <p><strong>KOT ID:</strong> {kotData.kot._id}</p>
            <h3>Items:</h3>
            <ul>
              {kotData.kot.items.map((item) => (
                <li key={item._id}>
                  <p>Menu Item: {item.menuItem}</p>
                  <p>Quantity: {item.quantity}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <button onClick={() => handlePrint("kot")}>Print KOT</button>
    </div>
  );
};

export default OrderDetails;
