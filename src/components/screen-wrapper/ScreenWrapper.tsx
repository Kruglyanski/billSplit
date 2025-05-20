import {FC, memo} from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {SCREEN_GRADIENT_START, SCREEN_GRADIENT_END} from '../../constants';
import {colors} from '../../theme/colors';
import {styles} from './styles';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';

interface IProps {
  title: string;
  gradientColors: string[];
  rightButtonText?: string;
  leftButtonText?: string;
  leftButtonIcon?: IconSource;
  onRightButtonPress?: () => void;
  onLeftButtonPress?: () => void;
  children: React.ReactNode;
}

export const ScreenWrapper: FC<IProps> = memo(
  ({
    title,
    gradientColors,
    leftButtonText,
    leftButtonIcon,
    onLeftButtonPress,
    rightButtonText,
    onRightButtonPress,
    children,
  }) => {
    return (
      <LinearGradient
        colors={gradientColors}
        start={SCREEN_GRADIENT_START}
        end={SCREEN_GRADIENT_END}
        style={styles.container}>
        <View style={styles.header}>
          <Text variant="headlineSmall" style={styles.welcome}>
            {title}
          </Text>
          <View style={styles.buttonContainer}>
            {onLeftButtonPress && (
              <Button
                mode="elevated"
                icon={leftButtonIcon}
                style={styles.button}
                onPress={onLeftButtonPress}>
                {leftButtonText}
              </Button>
            )}
            {onRightButtonPress && (
              <Button
                mode="outlined"
                style={styles.button}
                textColor={colors.white}
                onPress={onRightButtonPress}>
                {rightButtonText}
              </Button>
            )}
          </View>
        </View>
        {children}
      </LinearGradient>
    );
  },
);
