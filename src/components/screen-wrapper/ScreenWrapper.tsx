import {FC, memo} from 'react';
import {StyleProp, View, ViewProps} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {SCREEN_GRADIENT_START, SCREEN_GRADIENT_END} from '../../constants';
import {colors} from '../../theme/colors';
import {styles} from './styles';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';

export interface IButtonSettings {
  icon: IconSource;
  onPress: () => void;
  size?: number;
  iconColor?: string;
}

interface IProps {
  title: string;
  buttons?: IButtonSettings[];
  gradientColors: string[];
  containerStyle?: StyleProp<ViewProps>;
  children: React.ReactNode;
}

export const ScreenWrapper: FC<IProps> = memo(
  ({title, gradientColors, buttons = [], containerStyle, children}) => {
    return (
      <LinearGradient
        colors={gradientColors}
        start={SCREEN_GRADIENT_START}
        end={SCREEN_GRADIENT_END}
        style={styles.container}>
        <View style={styles.header}>
          <View style={styles.buttonWrapper}>
            {!!buttons[0] && (
              <IconButton
                iconColor={colors.darkWhite}
                size={40}
                {...buttons[0]}
              />
            )}
          </View>
          <Text variant="bodyLarge" style={styles.title}>
            {title}
          </Text>
          <View style={styles.buttonWrapper}>
            {!!buttons[1] && (
              <IconButton
                iconColor={colors.darkWhite}
                size={40}
                {...buttons[1]}
              />
            )}
          </View>
        </View>
        <View style={[styles.container, containerStyle]}>{children}</View>
      </LinearGradient>
    );
  },
);
