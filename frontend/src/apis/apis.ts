import axios from "axios";
import axiosRetry from "axios-retry";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_APP_URL}`,
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    console.log("🚀 Request started", config.url);
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
    console.log("🌟 Request successful", response.config.url);
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;

      // 공통 에러 로깅..
      if (status === 403) {
        // 권한 없음
        console.log("이 작업을 수행할 권한이 없습니다.");
      } else if (status === 500) {
        // 서버 오류
        console.log("서버에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      } else {
        // 기타 응답 오류
        console.log(
          `오류 발생: ${error.response.data.message || "알 수 없는 오류"}`
        );
      }
    } else if (error.request) {
      // 요청이 이루어졌지만 응답을 받지 못한 경우 (네트워크 문제)
      console.log("네트워크 오류: 서버에 응답이 없습니다.");
    } else {
      // 요청 설정 중 발생한 오류
      console.error("Error", error.message);
    }

    return Promise.reject(error);
  }
);

// 에러 발생 시 3번까지 자동 재시도
axiosRetry(api, { retries: 3 });

export default api;
