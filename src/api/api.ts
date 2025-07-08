import axios from 'axios';
import {Platform} from 'react-native';
import authStore from '../stores/authStore';

export const API_BASE_URL = Platform.select({
  //TODO: вынести!!!!!!!
  android: 'http://10.0.2.2:3000', // для Android эмулятора
  ios: 'http://localhost:3000', // для iOS симулятора
  default: 'http://localhost:3000', // для других случаев
});

// export const API_BASE_URL = 'https://bill-split-backend.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      try {
        const newToken = await authStore.refreshToken();

        error.config.headers['Authorization'] = `Bearer ${newToken}`;

        return api.request(error.config);
      } catch (e) {
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  },
);

let token: string | null = null;

export const setAuthToken = (newToken: string) => {
  token = newToken;
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const clearAuthToken = () => {
  token = null;
  delete api.defaults.headers.common['Authorization'];
};

export default api;
