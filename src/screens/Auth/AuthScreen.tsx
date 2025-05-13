import React, {FC, useCallback, useRef, useState} from 'react';
import {View, Alert, Image} from 'react-native';
import Animated, {SlideInRight} from 'react-native-reanimated';
import {useTranslation} from 'react-i18next';
import {LoginScreenNavigationProps} from '../../navigation/types';
import authStore from '../../stores/authStore';
import {getEmailError, getNameError, getPasswordError} from './auth-helper';
import {AuthForm} from '../../components/auth-form/AuthForm';
import {styles} from './styles';

interface IProps {
  navigation: LoginScreenNavigationProps['navigation'];
}

enum EAuthMode {
  LOGIN = 'login',
  REGISTRATION = 'registration',
}

export const AuthScreen: FC<IProps> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [authMode, setAuthMode] = useState(EAuthMode.LOGIN);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');

  const formIsTouched = useRef(false);

  const {t} = useTranslation();

  const changePassword = useCallback((value: string) => {
    setPassword(value);
    if (formIsTouched.current) {
      setPasswordError(getPasswordError(value));
    }
  }, []);

  const changeEmail = useCallback((value: string) => {
    setEmail(value);
    if (formIsTouched.current) {
      setEmailError(getEmailError(value));
    }
  }, []);

  const handleLogin = useCallback(async () => {
    const newEmailError = getEmailError(email);
    const newPasswordError = getPasswordError(password);

    if (newEmailError !== emailError) setEmailError(newEmailError);
    if (newPasswordError !== passwordError) setPasswordError(newPasswordError);

    formIsTouched.current = true;

    if (newEmailError || newPasswordError) return;

    try {
      await authStore.login(email, password);
      navigation.navigate('Home');
    } catch (e: any) {
      Alert.alert(
        t('auth.errors.error'),
        e.response?.data?.message || t('auth.errors.something_went_wrong'),
      );
    }
  }, [email, password, emailError, passwordError]);

  const handleRegister = useCallback(async () => {
    const newNameError = getNameError(name);
    const newEmailError = getEmailError(email);
    const newPasswordError = getPasswordError(password);

    if (newNameError !== nameError) setNameError(newNameError);
    if (newEmailError !== emailError) setEmailError(newEmailError);
    if (newPasswordError !== passwordError) setPasswordError(newPasswordError);

    if (newNameError || newEmailError || newPasswordError) return;

    try {
      await authStore.register(name, email, password);
    } catch (e: any) {
      Alert.alert(
        t('auth.errors.error'),
        e.response?.data?.message || t('auth.errors.something_went_wrong'),
      );
    }
  }, [name, email, password, nameError, passwordError, emailError]);

  const cleanFields = useCallback(() => {
    formIsTouched.current = false;
    setEmail('');
    setName('');
    setPassword('');
    setEmailError('');
    setNameError('');
    setPasswordError('');
  }, []);

  const showRegistration = useCallback(() => {
    setAuthMode(EAuthMode.REGISTRATION);
    cleanFields();
  }, [cleanFields]);

  const showLogin = useCallback(() => {
    setAuthMode(EAuthMode.LOGIN);
    cleanFields();
  }, [cleanFields]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/lanes-main-logo.png')}
        style={styles.logo}
      />
      {authMode === EAuthMode.LOGIN ? (
        <Animated.View
          key={authMode}
          entering={SlideInRight.duration(150)}
          style={styles.animatedWrapper}>
          <AuthForm
            title={t('auth.subheader.enter')}
            email={email}
            password={password}
            emailError={emailError}
            passwordError={passwordError}
            onChangeEmail={changeEmail}
            onChangePassword={changePassword}
            onSubmit={handleLogin}
            onSwitchMode={showRegistration}
            submitText={t('auth.enter')}
            switchText={t('auth.registration')}
          />
        </Animated.View>
      ) : (
        <Animated.View
          key={authMode}
          entering={SlideInRight.duration(150)}
          style={styles.animatedWrapper}>
          <AuthForm
            title={t('auth.subheader.registration')}
            name={name}
            email={email}
            password={password}
            nameError={nameError}
            emailError={emailError}
            passwordError={passwordError}
            showNameField
            onChangeName={setName}
            onChangeEmail={changeEmail}
            onChangePassword={changePassword}
            onSubmit={handleRegister}
            onSwitchMode={showLogin}
            submitText={t('auth.register')}
            switchText={t('auth.already_have_account')}
          />
        </Animated.View>
      )}
    </View>
  );
};
