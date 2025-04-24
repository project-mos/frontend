import axios from 'axios';
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from '../utils/token';
import URL from '../constants/URL';
import { API_ENDPOINT } from '../constants/api-end-point';

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: process.env.MOS_API_BASE_URL, // API 기본 URL
  withCredentials: true, // 쿠키 포함
  headers: {
    'Content-Type': 'application/json', // JSON 형태로 통신
    Accept: 'application/json',
  },
});

// 요청 인터셉터 - 매 요청마다 accessToken을 헤더에 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken(); // 로컬스토리지에서 accessToken 가져옴
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`; // 인증 헤더 추가
    }
    return config;
  },
  (error) => Promise.reject(error) // 요청 에러 시 그대로 전달
);

// 응답 인터셉터 (토큰 자동 갱신 로직 포함)
axiosInstance.interceptors.response.use(
  (response) => response, // 응답 성공 시 그대로 반환
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = getRefreshToken();

    // 조건: accessToken 만료 (401) && refreshToken 존재
    if (
      error.response?.status === 401 &&
      refreshToken &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      
      try {
        // refreshToken을 사용해 새로운 accessToken 요청
        const res = await axios.post(API_ENDPOINT.auth.refreshAuth().url, {
          data: refreshToken
        });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = res.data;

        // 새 토큰 저장
        setTokens(newAccessToken, newRefreshToken);

        // 원래 요청에 새 토큰 적용해서 재시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // 토큰 갱신 실패 -> 토큰 초기화 및 메인 페이지로 이동
        console.error('토큰 갱신 실패:', refreshError);
        clearTokens();
        window.location.href = URL.HOME; // 또는 router.push(URL.HOME)
      }
    }

    // 그 외 에러는 그대로 반환
    return Promise.reject(error);
  }
);

export default axiosInstance;
