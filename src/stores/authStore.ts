import {makeAutoObservable, runInAction} from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as apiService from '../api/apiService';
import {setAuthToken, clearAuthToken} from '../api/api';

interface IUser {
  id: number;
  name: string;
  email: string;
}

class AuthStore {
  user: IUser | null = null;
  loading = true;

  constructor() {
    makeAutoObservable(this);
    this.bootstrap();
  }

  async bootstrap() {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      try {
        const res = await apiService.getMe();
        runInAction(() => {
          this.user = res.data;
        });
      } catch {
        await this.logout();
      }
    }
    runInAction(() => {
      this.loading = false;
    });
  }

  async login(email: string, password: string) {
    const res = await apiService.login({email, password});
    const {token, user} = res.data;
    await AsyncStorage.setItem('token', token);

    setAuthToken(token);
    runInAction(() => {
      this.user = user;
    });
  }

  async register(name: string, email: string, password: string) {
    const res = await apiService.register({name, email, password});
    const {token, user} = res.data;
    await AsyncStorage.setItem('token', token);

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
