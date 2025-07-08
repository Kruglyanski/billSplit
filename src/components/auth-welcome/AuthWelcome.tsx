import React, {FC, memo} from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import Animated, {SlideInRight} from 'react-native-reanimated';
import {styles} from './styles';
import {useTranslation} from 'react-i18next';
import {CustomButton} from '../custom-button/CustomButton';

interface IProps {
  showRegistration: () => void;
  showLogin: () => void;
  googleLogin: () => void;
}

export const AuthWelcome: FC<IProps> = memo(
  ({showLogin, showRegistration, googleLogin}) => {
    const {t} = useTranslation();
    return (
      <Animated.View
        entering={SlideInRight.duration(150)}
        style={styles.animated}>
        <Text variant="headlineSmall" style={styles.title}>
          {t('auth.subheader.enter')}
        </Text>
        <View style={styles.buttons}>
          <CustomButton
            type="secondary"
            onPress={showRegistration}
            title={t('auth.registration')}
            width={270}
          />
          <CustomButton
            type="secondary"
            onPress={showLogin}
            title={t('auth.enter')}
            width={270}
          />
          <CustomButton
            type="secondary"
            onPress={googleLogin}
            title={t('auth.with_google')}
            width={270}
            image={require('../../../assets/images/google-logo.png')}
          />
        </View>
      </Animated.View>
    );
  },
);
