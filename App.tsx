import './i18n';

import React, {useEffect} from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {PaperProvider} from 'react-native-paper';
import {lightTheme} from './src/theme';
import {InfoModal} from './src/components/info-modal/InfoModal';
import {
  handleInitialDeeplink,
  subscribeToDeeplinks,
} from './src/utils/services/deeplinkService';
import SplashScreen from 'react-native-splash-screen';
import authStore from './src/stores/authStore';
import {
  disconnectSocket,
  initSocket,
} from './src/utils/services/websocket-service/websocketService';
import {observer} from 'mobx-react-lite';

function App(): React.JSX.Element {
  useEffect(() => {
    handleInitialDeeplink();
    const unsubscribe = subscribeToDeeplinks();
    SplashScreen.hide();

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (authStore.jwt) {
      console.log('APP SOCKET INIT');
      initSocket();
    } else {
      console.log('APP SOCKET DISCONNECT 1');
      disconnectSocket();
    }

    return () => {
      console.log('APP SOCKET DISCONNECT 2');
      disconnectSocket();
    };
  }, [authStore.jwt]);

  let theme = lightTheme;

  return (
    <PaperProvider {...{theme}}>
      <AppNavigator />
      <InfoModal />
    </PaperProvider>
  );
}

export default observer(App);
