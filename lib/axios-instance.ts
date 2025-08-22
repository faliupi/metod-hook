// lib/axios-instance.ts
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
});

// Keep track of token fetch promise
let tokenPromise: Promise<string | null> | null = null;

const getToken = async () => {
  try {
    const response = await fetch('/api/auth/token');
    if (!response.ok) throw new Error('Failed to fetch token');
    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error('Error fetching token:', error);
    return null;
  }
};

apiClient.interceptors.request.use(async (config) => {
  // Only fetch token once if multiple requests are made simultaneously
  if (!tokenPromise) {
    tokenPromise = getToken();
  }
  
  const token = await tokenPromise;
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Reset token promise after use
  tokenPromise = null;
  
  return config;
});

// Add response interceptor for handling token expiration
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Redirect to login if token is invalid/expired
        window.location.href = '/login';
        return Promise.reject(error);
      } catch (refreshError) {
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;