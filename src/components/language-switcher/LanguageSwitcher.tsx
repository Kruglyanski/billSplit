import React, {memo, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import i18n from '../../../i18n';
import {useTranslation} from 'react-i18next';
import {colors} from '../../theme/colors';
import { styles } from './styles';
import { changeLanguage } from '../../api/apiService';

const LANGUAGES = [
  {label: 'RU', value: 'ru'},
  {label: 'EN', value: 'en'},
];

export const LanguageSwitcher = memo(() => {
  const [value, setValue] = useState<string>(i18n.language || 'en');
  const {t} = useTranslation();

  const handleLanguageChange = async (lang: string) => {
    setValue(lang);
    i18n.changeLanguage(lang);

    try {
      await changeLanguage(lang);
    } catch (e) {
      console.warn('Ошибка при записи настроек языка', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{t('profile.chose_lang')}</Text>
      <View style={styles.row}>
        {LANGUAGES.map(({label, value: lang}) => (
          <TouchableOpacity
            key={lang}
            style={styles.option}
            onPress={() => handleLanguageChange(lang)}>
            <View
              style={[
                styles.radioOuter,
                {
                  borderColor:
                    value === lang ? colors.darkWhite : colors.lightMain,
                },
              ]}>
              {value === lang && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.lang}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
});

