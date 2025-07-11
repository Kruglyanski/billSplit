import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {RadioButton, Text} from 'react-native-paper';
import i18n from '../../../i18n';
import api from '../../api/api';
import {useTranslation} from 'react-i18next';
import {colors} from '../../theme/colors';
import {styles} from './styles';

export const LanguageSwitcher = () => {
  const [value, setValue] = useState<string>(i18n.language || 'en');
  const {t} = useTranslation();

  const handleLanguageChange = async (lang: string) => {
    setValue(lang);
    i18n.changeLanguage(lang);

    try {
      await api.patch('/users/settings', {
        settings: {language: lang},
      });
    } catch (e) {
      console.warn('Failed to update language setting', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="bodyLarge" style={styles.label}>
        {t('profile.chose_lang')}
      </Text>
      <RadioButton.Group onValueChange={handleLanguageChange} value={value}>
        <View style={styles.row}>
          <View style={styles.option}>
            <RadioButton value="ru" color={colors.lightMain} />
            <Text style={styles.lang}>RU</Text>
          </View>
          <View style={styles.option}>
            <RadioButton value="en" color={colors.lightMain} />
            <Text style={styles.lang}>EN</Text>
          </View>
        </View>
      </RadioButton.Group>
    </View>
  );
};
