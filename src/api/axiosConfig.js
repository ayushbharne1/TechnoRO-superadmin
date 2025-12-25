import axios from 'axios';

// Base URL used across the app (matches other slices)
const BASE_URL = 'https://ro-service-engineer-be.onrender.com';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

// Attach token automatically if present
axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      // ignore localStorage errors in SSR / restricted environments
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
