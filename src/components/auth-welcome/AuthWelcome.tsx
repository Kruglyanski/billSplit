import React, {FC, memo} from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import Animated, {SlideInRight} from 'react-native-reanimated';
import {styles} from './styles';
import {useTranslation} from 'react-i18next';

interface IProps {
  showRegistration: () => void;
  showLogin: () => void;
}
export const AuthWelcome: FC<IProps> = memo(({showLogin, showRegistration}) => {
  const {t} = useTranslation();
  return (
    <Animated.View
      entering={SlideInRight.duration(150)}
      style={styles.animated}>
      <Text variant="headlineLarge" style={styles.title}>
        {t('auth.subheader.enter')}
      </Text>
      <Text variant="displayMedium" style={styles.name}>
        BillSplit
      </Text>
      <View style={styles.buttons}>
        <Button
          mode="elevated"
          style={styles.button}
          onPress={showRegistration}>
          {t('auth.registration')}
        </Button>
        <Button mode="contained" style={styles.button} onPress={showLogin}>
          {t('auth.enter')}
        </Button>
      </View>
    </Animated.View>
  );
});
