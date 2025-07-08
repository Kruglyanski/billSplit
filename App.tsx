import './i18n';

import React, {useEffect} from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {PaperProvider} from 'react-native-paper';
import {useColorScheme} from 'react-native';
import {lightTheme, darkTheme} from './src/theme';
import {EThemeType, appStore} from './src/stores/appStore';
import {InfoModal} from './src/components/info-modal/InfoModal';
import {
  handleInitialDeeplink,
  subscribeToDeeplinks,
} from './src/utils/services/deeplinkService';
import SplashScreen from 'react-native-splash-screen';
import authStore from './src/stores/authStore';
import { disconnectSocket, initSocket } from './src/utils/services/websocket-service/websocketService';
import { observer } from 'mobx-react-lite';

const themeMap = {
  [EThemeType.LIGHT]: lightTheme,
  [EThemeType.DARK]: darkTheme,
};

function App(): React.JSX.Element {
  const colorScheme = useColorScheme();

  useEffect(() => {
    handleInitialDeeplink();
    const unsubscribe = subscribeToDeeplinks();
    SplashScreen.hide();

    return () => unsubscribe();
  }, []);
  
  useEffect(() => {
    if (authStore.jwt) {
      console.log('APP SOCKET INIT')
      initSocket();
    } else {
      console.log('APP SOCKET DISCONNECT 1')
      disconnectSocket();
    }
  
    return () => {
      console.log('APP SOCKET DISCONNECT 2')
      disconnectSocket();
    };
  }, [authStore.jwt]);

  let theme = lightTheme;

  // if (appStore.themeType !== null) {
  //   theme = themeMap[appStore.themeType];
  // } else if (colorScheme) {
  //   theme = themeMap[colorScheme as EThemeType];
  // } else theme = lightTheme;

  return (
    <PaperProvider {...{theme}}>
      <AppNavigator />
      <InfoModal />
    </PaperProvider>
  );
}

export default observer(App);
