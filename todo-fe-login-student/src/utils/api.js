import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_PROXY || "https://todoapp-dem.netlify.app"}`,
  headers: {
    "Content-Type": "application/json",
    authorization: "Bearer " + sessionStorage.getItem("token"),
  },
});
/**
 * console.log all requests and responses
 */
api.interceptors.request.use(
  (request) => {
    console.log("Starting Request", request);
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  function (error) {
    console.log("RESPONSE ERROR", error.response?.data);
    console.log("REQUEST URL:", error.config?.url);
    console.log("REQUEST METHOD:", error.config?.method);
    console.log("BASE URL:", error.config?.baseURL);
    console.log("FULL URL:", error.config?.baseURL + error.config?.url);
    return Promise.reject(error.response?.data || error);
  }
);

export default api;
