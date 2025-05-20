import React, {FC, useCallback, useRef, useState} from 'react';
import {Image, Keyboard} from 'react-native';
import {useTranslation} from 'react-i18next';
import {LoginScreenNavigationProps} from '../../navigation/types';
import authStore from '../../stores/authStore';
import {getEmailError, getNameError, getPasswordError} from './auth-helper';
import {AuthForm} from '../../components/auth-form/AuthForm';
import {styles} from './styles';
import {appStore} from '../../stores/appStore';
import {useKeyboardOpen} from '../../hooks/use-keyboard-open';
import {AuthWelcome} from '../../components/auth-welcome/AuthWelcome';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../theme/colors';
import {SCREEN_GRADIENT_END, SCREEN_GRADIENT_START} from '../../constants';

interface IProps {
  navigation: LoginScreenNavigationProps['navigation'];
}

enum EAuthMode {
  LOGIN = 'login',
  REGISTRATION = 'registration',
  MAIN = 'main',
}

const GRADIENT_COLORS = [colors.orange, colors.white];

export const AuthScreen: FC<IProps> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [authMode, setAuthMode] = useState(EAuthMode.MAIN);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');

  const formIsTouched = useRef(false);

  const {t} = useTranslation();
  const isKeyboardOpen = useKeyboardOpen();

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
      appStore.showInfoModal({
        message:
          `${(t('auth.errors.error'), e.response?.data?.message)}` ||
          t('auth.errors.something_went_wrong'),
      });
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
      appStore.showInfoModal({
        message:
          `${(t('auth.errors.error'), e.response?.data?.message)}` ||
          t('auth.errors.something_went_wrong'),
      });
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

  const switchAuthMode = useCallback(
    (mode: EAuthMode) => {
      const switchMode = () => {
        cleanFields();
        setAuthMode(mode);
      };

      if (isKeyboardOpen) {
        Keyboard.dismiss();
        setTimeout(switchMode, 300);
      } else {
        switchMode();
      }
    },
    [isKeyboardOpen, cleanFields],
  );

  const showRegistration = useCallback(() => {
    switchAuthMode(EAuthMode.REGISTRATION);
  }, [switchAuthMode]);

  const showLogin = useCallback(() => {
    switchAuthMode(EAuthMode.LOGIN);
  }, [switchAuthMode]);

  const showMain = useCallback(() => {
    switchAuthMode(EAuthMode.MAIN);
  }, [switchAuthMode]);

  return (
    <LinearGradient
      colors={GRADIENT_COLORS}
      start={SCREEN_GRADIENT_START}
      end={SCREEN_GRADIENT_END}
      style={styles.container}>
      <Image
        source={require('../../../assets/images/lanes-main-logo.png')}
        style={styles.logo}
      />
      {authMode === EAuthMode.MAIN && (
        <AuthWelcome {...{showLogin, showRegistration}} />
      )}
      {authMode === EAuthMode.LOGIN && (
        <AuthForm
          key={authMode}
          title={t('auth.subheader.enter')}
          email={email}
          password={password}
          emailError={emailError}
          passwordError={passwordError}
          onChangeEmail={changeEmail}
          onChangePassword={changePassword}
          onSubmit={handleLogin}
          onBackPress={showMain}
          submitText={t('auth.enter')}
          backText={t('auth.back')}
        />
      )}
      {authMode === EAuthMode.REGISTRATION && (
        <AuthForm
          key={authMode}
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
          onBackPress={showMain}
          submitText={t('auth.register')}
          backText={t('auth.already_have_account')}
        />
      )}
    </LinearGradient>
  );
};
