import axios from 'axios';
import {Platform} from 'react-native';
import * as Keychain from 'react-native-keychain';

const API_BASE_URL = Platform.select({
  android: 'http://10.0.2.2:3000', // для Android эмулятора
  ios: 'http://localhost:3000', // для iOS симулятора
  default: 'http://localhost:3000', // для других случаев
});

// const API_BASE_URL = 'https://bill-split-backend.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      try {
        const credentials = await Keychain.getGenericPassword();
        if (!credentials) throw new Error('No refresh token stored');

        const refreshToken = credentials.password;

        const {data} = await api.post('/auth/refresh', null, {
          headers: {Authorization: `Bearer ${refreshToken}`},
        });

        await Keychain.setGenericPassword('refreshToken', data.refreshToken);
        error.config.headers['Authorization'] = `Bearer ${data.accessToken}`;
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
