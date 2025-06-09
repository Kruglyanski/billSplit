import {action, makeAutoObservable} from 'mobx';

export enum EThemeType {
  LIGHT = 'light',
  DARK = 'dark',
}

type TInfoModalSettings = {
  message: string;
  title?: string;
  action?: () => void;
};

class AppStore {
  _themeType: EThemeType | null = null;
  infoModalMessage = '';
  infoModalTitle = '';
  infoModalAction: (() => void) | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setTheme(themeType: EThemeType) {
    this._themeType = themeType;
  }

  hideInfoModal = action(() => {
    this.infoModalMessage = '';
    this.infoModalTitle = '';
    this.infoModalAction = null;
  });

  showInfoModal({message, title, action}: TInfoModalSettings) {
    this.infoModalMessage = message;
    if (title) {
      this.infoModalTitle = title;
    }
    if (action) {
      this.infoModalAction = action;
    }
  }

  get themeType() {
    return this._themeType;
  }
}

export const appStore = new AppStore();
