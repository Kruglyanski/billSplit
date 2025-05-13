import {MIN_PASSWORD_LENGTH} from '../../constants';
import {t} from 'i18next';

export const validateEmail = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

export const validatePassword = (value: string) => {
  return value.length >= MIN_PASSWORD_LENGTH;
};

export const getEmailError = (value: string) => {
  if (!value) {
    return t('auth.errors.fill_email');
  }
  if (!validateEmail(value)) {
    return t('auth.errors.invalid_email');
  }
  return '';
};

export const getPasswordError = (value: string) => {
  if (!value) {
    return t('auth.errors.fill_password');
  }
  if (!validatePassword(value)) {
    return t('auth.errors.password_too_short', {min: MIN_PASSWORD_LENGTH});
  }
  return '';
};

export const getNameError = (value: string) => {
  if (!value) {
    return t('auth.errors.fill_name');
  }
  return '';
};
