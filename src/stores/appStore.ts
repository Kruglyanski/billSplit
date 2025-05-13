import {makeAutoObservable} from 'mobx';

export enum EThemeType {
  LIGHT = 'light',
  DARK = 'dark',
}

class AppStore {
  _themeType: EThemeType | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setTheme(themeType: EThemeType) {
    this._themeType = themeType;
  }

  get themeType() {
    return this._themeType;
  }
}

export const appStore = new AppStore();
