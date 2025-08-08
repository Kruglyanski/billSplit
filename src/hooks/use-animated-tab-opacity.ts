// useAnimatedTabOpacity.ts
import {useEffect} from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {EActiveButton} from '../components/splitted-switch-button/SplittedSwitchButton';

export const useAnimatedTabOpacity = (activeTab: EActiveButton) => {
  const leftOpacity = useSharedValue(1);
  const rightOpacity = useSharedValue(0);

  useEffect(() => {
    if (activeTab === EActiveButton.left) {
      leftOpacity.value = withTiming(1, {duration: 250});
      rightOpacity.value = withTiming(0, {duration: 250});
    } else {
      leftOpacity.value = withTiming(0, {duration: 250});
      rightOpacity.value = withTiming(1, {duration: 250});
    }
  }, [activeTab]);

  const leftAnimatedStyle = useAnimatedStyle(() => ({
    opacity: leftOpacity.value,
  }));

  const rightAnimatedStyle = useAnimatedStyle(() => ({
    opacity: rightOpacity.value,
  }));

  return {leftAnimatedStyle, rightAnimatedStyle};
};
