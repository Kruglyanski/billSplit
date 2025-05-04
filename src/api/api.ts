import axios from 'axios';

const API_BASE_URL = ''; 

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

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
