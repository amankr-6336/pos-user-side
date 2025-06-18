import React, { useEffect, useState } from "react";
import "./Landing.scss";
import Header from "../../component/Header/Header";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { axiosClient } from "../../utils/AxiosClient";
import { RiBillFill } from "react-icons/ri";
import Dialog from "../../component/common/dialog/Dialog";
import { useSelector } from "react-redux";
import Assistent from "../../component/AiAssistent/Assistent";
import Loading from "../../component/Loading/Loading";

function LandingPage() {
  const [loading, setLoading] = useState(true);
  const [tableInfo, setTableInfo] = useState(null);
  const [billDialog, setBillDialog] = useState(false);
  const params = useParams();
  const order = useSelector((state) => state.OrderReducer.order);

  useEffect(() => {
    getTableInfo()
  }, []);

  async function getTableInfo() {
    try {
      const response = await axiosClient.get("/table/get-single-table", {
        params: { restaurantId: params.restroId, tableNumber: params.tableId },
      });
      console.log(response);
      setTableInfo(response?.data?.result);
      document.title = document.title + ' | ' + response?.data?.result?.restro?.name || "Restaurant";
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false);
    }
  }
  function handleCloseBillDialog() {
    setBillDialog(false);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="landing-page">
      <div className="header">
        <Header table={tableInfo} />
      </div>

      <div className="table-info">
        <p>Table {params.tableId} </p>
        <p onClick={() => setBillDialog(true)}>
          <RiBillFill /> Bill
        </p>
        {billDialog && (
          <Dialog
            close={false}
            isOpen={billDialog}
            onClose={handleCloseBillDialog}
            title={`Order Id :  #${order?.order?._id}`}
          >
            <div className="bill-details">
              <div className="customer-info">
                <p>{order?.order?.user}</p>
                <p>{order?.order?.userNumber}</p>
              </div>
              <div className="order-items">
                <p id="order-items">Order Items</p>
                {order?.order?.items.map((data, index) => (
                  <div key={index} className="single-item">
                    <div className="dish-name">
                      {data?.menuItem?.name} x {data?.quantity}
                    </div>

                    <div className="price">{data?.menuItem?.price}</div>
                  </div>
                ))}
              </div>
              <div className="order-total">
                <p>Total</p>
                <p> ₹ {order?.order?.totalPrice}</p>
              </div>
              <div className="order-status">
                <p>{order?.order?.status}</p>
              </div>
            </div>
          </Dialog>
        )}
      </div>

      <div className="menu-tabs">
        <NavLink
          to="recommended"
          style={({ isActive }) => ({
            padding: "5px 10px",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            backgroundColor: isActive? "#000000": "#FFFFFF",
            borderRadius:"5px",
            color: isActive? "#FFFFFF":"#000000",
            textDecoration: "none",
            borderBottom: isActive
              ? "2px solid black"
              : "2px solid transparent",
            fontWeight: "500",
            fontSize:"0.8rem"
          })}
        >
          Recommended
        </NavLink>

        <NavLink
          to="all"
          style={({ isActive }) => ({
            padding: "5px 10px",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            backgroundColor: isActive? "#000000": "#FFFFFF",
            borderRadius:"5px",
            color: isActive? "#FFFFFF":"#000000",
            textDecoration: "none",
            borderBottom: isActive
              ? "2px solid black"
              : "2px solid transparent",
            fontWeight: "500",
            fontSize:"0.8rem"
          })}
        >
          All Dishes
        </NavLink>
      </div>

      <div className="outlet">
        <Outlet />
      </div>
      <Assistent />
    </div>
  );
}

export default LandingPage;
