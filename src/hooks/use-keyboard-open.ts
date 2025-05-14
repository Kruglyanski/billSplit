import {useEffect, useState} from 'react';
import {Keyboard, EmitterSubscription} from 'react-native';

export const useKeyboardOpen = (): boolean => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const showSub: EmitterSubscription = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardOpen(true);
      },
    );

    const hideSub: EmitterSubscription = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardOpen(false);
      },
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return isKeyboardOpen;
};
