import axios from "axios";

console.log("Environment variables:");
console.log("REACT_APP_BACKEND_URL:", process.env.REACT_APP_BACKEND_URL);
console.log("REACT_APP_BACKEND_PROXY:", process.env.REACT_APP_BACKEND_PROXY);
console.log("NODE_ENV:", process.env.NODE_ENV);

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_PROXY || "http://localhost:5000"}`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (request) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      request.headers.authorization = `Bearer ${token}`;
    }
    return request;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    return Promise.reject(error.response?.data || error);
  }
);

export default api;
