import {makeAutoObservable, runInAction} from 'mobx';
import * as apiService from '../api/apiService';
import * as authService from '../utils/services/authService';
import {setAuthToken, clearAuthToken} from '../api/api';

interface IUser {
  id: number;
  name: string;
  email: string;
}

class AuthStore {
  user: IUser | null = null;
  isLoading = true;
  jwt: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.bootstrap();
  }

  async bootstrap() {
    const token = await authService.getAccessToken();

    if (token) {
      setAuthToken(token);

      try {
        const res = await apiService.getMe();
        runInAction(() => {
          this.jwt = token;
          this.user = res.data;
        });
      } catch {
        await this.logout();
      }
    }

    runInAction(() => {
      this.isLoading = false;
    });
  }

  async login(email: string, password: string) {
    const res = await apiService.login({email, password});
    const {tokens, user} = res.data;
    authService.saveTokens(tokens.accessToken, tokens.refreshToken);
    setAuthToken(tokens.accessToken);

    runInAction(() => {
      this.jwt = tokens.accessToken;
      this.user = user;
    });
  }

  async register(name: string, email: string, password: string) {
    const res = await apiService.register({name, email, password});
  }

  async confirmEmail(token: string) {
    const res = await apiService.confirmEmail(token);
    const {tokens, user} = res.data;
    authService.saveTokens(tokens.accessToken, tokens.refreshToken);
    setAuthToken(tokens.accessToken);

    runInAction(() => {
      this.jwt = tokens.accessToken;
      this.user = user;
    });
  }

  async loginWithGoogle(idToken: string) {
    const res = await apiService.loginWithGoogle({idToken});
    const {tokens, user} = res.data;
    authService.saveTokens(tokens.accessToken, tokens.refreshToken);
    setAuthToken(tokens.accessToken);

    runInAction(() => {
      this.jwt = tokens.accessToken;
      this.user = user;
    });
  }

  async refreshToken() {
    const rt = (await authService.getRefreshToken()) || '';
    const res = await apiService.refreshToken(rt);
    const {tokens} = res.data;
    authService.saveTokens(tokens.accessToken, tokens.refreshToken);
    setAuthToken(tokens.accessToken);

    runInAction(() => {
      this.jwt = tokens.accessToken;
    });

    return tokens.accessToken;
  }

  async logout() {
    apiService.logout();
    authService.resetTokens();
    clearAuthToken();
    runInAction(() => {
      this.jwt = null;
      this.user = null;
    });
  }
}

const authStore = new AuthStore();
export default authStore;
