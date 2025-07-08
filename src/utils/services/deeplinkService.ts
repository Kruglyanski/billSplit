import {EmitterSubscription, Linking} from 'react-native';
import {NavigationContainerRef} from '@react-navigation/native';
import {getQueryFromUrl} from '../helpers/get-query-from-url';

let navigator: NavigationContainerRef<any> | null = null;

export const setNavigator = (navRef: NavigationContainerRef<any>) => {
  navigator = navRef;
};

export const handleInitialDeeplink = async () => {
  const initialUrl = await Linking.getInitialURL();

  if (initialUrl) {
    handleUrl(initialUrl);
  }
};

export const handleUrl = (url: string) => {
  if (!navigator) return;

  const path = url.split('://')[1].split('?')[0];
  const token = getQueryFromUrl(url, 'token');

  if (path === 'confirm' && token) {
    navigator.navigate('ConfirmEmail', {token});
  }
};

export const subscribeToDeeplinks = () => {
  let sub: EmitterSubscription;
  try {
    sub = Linking.addEventListener('url', event => {
      handleUrl(event.url);
    });
  } catch (error) {
    console.log('subscribeToDeeplinks error', error);
  }

  return () => sub.remove();
};
