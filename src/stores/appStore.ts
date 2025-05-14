import {action, makeAutoObservable} from 'mobx';

export enum EThemeType {
  LIGHT = 'light',
  DARK = 'dark',
}

class AppStore {
  _themeType: EThemeType | null = null;
  infoModalMessage = '';
  infoModalTitle = '';

  constructor() {
    makeAutoObservable(this);
  }

  setTheme(themeType: EThemeType) {
    this._themeType = themeType;
  }

  hideInfoModal = action(() => {
    this.infoModalMessage = '';
  });

  showInfoModal(message: string, title?: string) {
    this.infoModalMessage = message;
    if (title) {
      this.infoModalTitle = title;
    }
  }

  get themeType() {
    return this._themeType;
  }
}

export const appStore = new AppStore();
