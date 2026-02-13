import axios from 'axios';

// Base URL used across the app
const BASE_URL = 'https://ro-service-engineer-be.onrender.com';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - attach token automatically if present
axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Handle FormData - let axios set the Content-Type for multipart/form-data
      if (config.data instanceof FormData) {
        delete config.headers['Content-Type'];
      }
    } catch (err) {
      // Ignore localStorage errors in SSR / restricted environments
      console.error('Error accessing localStorage:', err);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle common errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/login';
    }

    // Handle network errors
    if (!error.response) {
      console.error('Network error:', error);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;