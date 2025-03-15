import axios from 'axios';
import { LoginCredentials, RegisterCredentials, AuthResponse } from '../types';
import { getToken } from '../utils/tokenUtils';

const API_URL = 'http://localhost:5000/api/auth';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to headers for authenticated requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const register = async (userData: RegisterCredentials): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>('/register', userData);
  return response.data;
};

export const login = async (userData: LoginCredentials): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>('/login', userData);
  return response.data;
};

export const getCurrentUser = async (): Promise<AuthResponse> => {
  const response = await axiosInstance.get<AuthResponse>('/me');
  return response.data;
};