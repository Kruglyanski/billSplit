import React, {FC, useCallback, useMemo} from 'react';
import {observer} from 'mobx-react-lite';
import {useTranslation} from 'react-i18next';
import authStore from '../../stores/authStore';
import {ProfileScreenNavigationProps} from '../../navigation/types';
import {
  IButtonSettings,
  ScreenWrapper,
} from '../../components/screen-wrapper/ScreenWrapper';
import {appStore} from '../../stores/appStore';
import {DEFAULT_GRADIENT_COLORS} from '../../constants';
import {styles} from './styles';
import {LanguageSwitcher} from '../../components/language-switcher/LanguageSwitcher';
import {View} from 'react-native';
import {CustomButton} from '../../components/custom-button/CustomButton';
import {ParticipantCard} from '../../components/participant-card/ParticipantCard';

interface IProps {
  navigation: ProfileScreenNavigationProps['navigation'];
}

export const ProfileScreen: FC<IProps> = observer(({navigation}) => {
  const {t} = useTranslation();

  const logOut = useCallback(() => {
    authStore.logout();
    navigation.navigate('Auth');
  }, [navigation]);

  const showLogoutModal = useCallback(() => {
    appStore.showInfoModal({
      message: t('home.logout_message'),
      title: t('home.attention'),
      action: () => {
        appStore.hideInfoModal();
        logOut();
      },
    });
  }, [logOut]);

  const headerButtons: IButtonSettings[] = useMemo(() => {
    return [{icon: 'chevron-left', onPress: navigation.goBack}];
  }, [navigation, t]);

  return (
    <ScreenWrapper
      title={t('profile.title')}
      gradientColors={DEFAULT_GRADIENT_COLORS}
      buttons={headerButtons}>
      {authStore.user && (
        <View style={styles.userWrapper}>
          <ParticipantCard item={authStore.user} isSelected={false} />
        </View>
      )}
      <LanguageSwitcher />
      <View style={styles.logoutWrapper}>
        <CustomButton
          type="secondary"
          onPress={showLogoutModal}
          icon="logout"
          title={t('home.logout')}
          width={100}
        />
      </View>
    </ScreenWrapper>
  );
});
