import { makeAutoObservable, runInAction } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as apiService from '../api/apiService';
import { setAuthToken, clearAuthToken } from '../api/api';

type User = { id: number; name: string; email: string };

class AuthStore {
  user: User | null = null;
  loading = true;

  constructor() {
    makeAutoObservable(this);
    this.bootstrap();
  }

  async bootstrap() {
    const token = await AsyncStorage.getItem('token');
    const userData = await AsyncStorage.getItem('user');
    if (token && userData) {
      setAuthToken(token);
      runInAction(() => {
        this.user = JSON.parse(userData);
      });
    }
    runInAction(() => {
      this.loading = false;
    });
  }

  async login(email: string, password: string) {
    const res = await apiService.login({ email, password });
    const { token, user } = res.data;
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('user', JSON.stringify(user));
    setAuthToken(token);
    runInAction(() => {
      this.user = user;
    });
  }

  async register(name: string, email: string, password: string) {
    const res = await apiService.register({ name, email, password });
    const { token, user } = res.data;
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('user', JSON.stringify(user));
    setAuthToken(token);
    runInAction(() => {
      this.user = user;
    });
  }

  async logout() {
    await AsyncStorage.clear();
    clearAuthToken();
    runInAction(() => {
      this.user = null;
    });
  }
}

const authStore = new AuthStore();
export default authStore;
