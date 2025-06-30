import axios from "axios";

const API_ROOT = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

// Token Getter
const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

// Axios Instance
const axiosInstance = axios.create({
  baseURL: API_ROOT,
  timeout: 8000,
});

// Request Interceptor
axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response Interceptor
axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err?.response?.data?.message || "API Error";
    console.error("API Error:", message);
    return Promise.reject(err);
  }
);

// Exported Methods
const APIAgent = {
  get: (url, config = {}) => axiosInstance.get(url, config),
  post: (url, data, config = {}) => axiosInstance.post(url, data, config),
  patch: (url, data, config = {}) => axiosInstance.patch(url, data, config),
  delete: (url, config = {}) => axiosInstance.delete(url, config),
};

export default APIAgent; 