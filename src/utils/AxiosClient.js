import axios from "axios";

const getGuestToken = () => {
  let guestToken = localStorage.getItem("guestToken");
  if (!guestToken) {
    guestToken = crypto.randomUUID();
    localStorage.setItem("guestToken", guestToken);
  }
  return guestToken;
};

let baseURL = "http://localhost:4001/";

export const axiosClient = axios.create({
  baseURL,
  withCredentials: true,
});

axiosClient.interceptors.request.use(
  (config) => {
    const guestToken = getGuestToken();
    config.headers["Guest-Token"] = guestToken;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
