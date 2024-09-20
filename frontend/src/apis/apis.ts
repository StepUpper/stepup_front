import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_APP_URL}`,
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    console.log("Request started");
    return config;
  },
  (error) => {
    console.log("Request error:", error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
api.interceptors.response.use(
  (response) => {
    console.log("Request successful");
    return response;
  },
  (error) => {
    console.error(
      "Response error:",
      error.response ? error.response.data : error.message
    );
    return Promise.reject(error);
  }
);

export default api;
