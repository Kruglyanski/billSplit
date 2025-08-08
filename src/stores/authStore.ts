import {makeAutoObservable, runInAction} from 'mobx';
import * as apiService from '../api/apiService';
import * as authService from '../utils/services/authService';
import {setAuthToken, clearAuthToken} from '../api/api';
import i18n from '../../i18n';
import {IUser} from './userStore';

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
        const user = res.data;
        console.log('asd user', user);
        runInAction(() => {
          this.jwt = token;
          this.user = user;
        });

        if (user.settings?.language) {
          i18n.changeLanguage(user.settings.language);
        }
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
    console.log('asd res', res);
    const {tokens, user} = res.data;
    console.log('asd user ', user);
    authService.saveTokens(tokens.accessToken, tokens.refreshToken);
    setAuthToken(tokens.accessToken);

    runInAction(() => {
      this.jwt = tokens.accessToken;
      this.user = user;
    });

    if (user.settings?.language) {
      i18n.changeLanguage(user.settings.language);
    }
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

    if (user.settings?.language) {
      i18n.changeLanguage(user.settings.language);
    }
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

    if (user.settings?.language) {
      i18n.changeLanguage(user.settings.language);
    }
  }

  async refreshToken() {
    const rt = (await authService.getRefreshToken()) || '';
    const res = await apiService.refreshToken(rt);

    const {accessToken, refreshToken} = res.data;

    await authService.saveTokens(accessToken, refreshToken);

    setAuthToken(accessToken);

    runInAction(() => {
      this.jwt = accessToken;
    });

    return accessToken;
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
