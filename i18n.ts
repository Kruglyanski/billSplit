import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import ru from './locales/ru/translation.json';
import en from './locales/en/translation.json';

const resources = {
  ru: { translation: ru },
  en: { translation: en },
};

const fallbackLng = 'en';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: (callback: (lang: string) => void) => {
    const locales = RNLocalize.getLocales();

    if (Array.isArray(locales)) {
      const firstLocale = locales[0]?.languageTag || 'en';
      callback('ru');//firstLocale
    } else {
      callback('en');
    }
  },
  init: () => {},
  cacheUserLanguage: () => {},
};


i18n
  .use(languageDetector as any)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
