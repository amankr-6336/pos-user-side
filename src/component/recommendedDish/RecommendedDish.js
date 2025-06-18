import React, { useEffect, useState } from "react";
import SingleMeneBox from "../SingleMenuBox/SingleMeneBox";
import "./recommendedDish.scss";
import { useDispatch, useSelector } from "react-redux";
import { axiosClient } from "../../utils/AxiosClient";
import { useParams } from "react-router-dom";
import { setRecommendedDish } from "../../redux/RecommendedDish/RecommendedDishReducer";
import Loading from "../Loading/Loading";
function RecommendedDish() {
  const [loading, setLoading] = useState(true);
  const param = useParams();
  const restroId = param.restroId;
  const dispatch = useDispatch();
  const recommendations = useSelector(
    (state) => state.RecommendedDishReducer.r_dishes
  );
  // console.log(recommendations);

  // useEffect(() => {
  //   fetchRecommendedDishes();
  // }, [restroId]);

  useEffect(() => {
    let unmounted = false;

    const fetch = async () => {
      try {
        const pos = await getCurrentLocation();
        if (unmounted) return;

        const { latitude, longitude } = pos.coords;

        const res = await axiosClient.get("/assistant/recommend/", {
          params: { restroId, lat: latitude, lon: longitude },
        });

        if (!unmounted) {
          dispatch(setRecommendedDish(res?.data?.result?.recommended));
        }
      } catch (error) {
        if (!unmounted) {
          console.error("Error fetching recommendations:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetch();

    return () => {
      unmounted = true;
    };
  }, [restroId,dispatch]);

  const getCurrentLocation = async () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  // const apiFunction = async () => {
  //   if (!restroId) return [];
  //   const pos = await new Promise((resolve, reject) =>
  //     navigator.geolocation.getCurrentPosition(resolve, reject)
  //   );
  //   const { latitude, longitude } = pos.coords;

  //   const res = await axiosClient.get("/assistant/recommend/", {
  //     params: { restroId, lat: latitude, lon: longitude },
  //   });

  //   return res?.data?.result?.recommended;
  // };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="recommend-dish">
      <div className="r-listing">
        {recommendations?.map((data, index) => (
          <SingleMeneBox key={index} data={data} />
        ))}
      </div>
    </div>
  );
}

export default RecommendedDish;
