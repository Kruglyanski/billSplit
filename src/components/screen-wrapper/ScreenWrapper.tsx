import {FC, memo} from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {SCREEN_GRADIENT_START, SCREEN_GRADIENT_END} from '../../constants';
import {colors} from '../../theme/colors';
import {styles} from './styles';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';
export interface IButtonSettings {
  title?: string;
  icon?: IconSource;
  onPress?: () => void;
}

interface IProps {
  title: string;
  buttons: IButtonSettings[];
  gradientColors: string[];
  children: React.ReactNode;
}

export const ScreenWrapper: FC<IProps> = memo(
  ({title, gradientColors, buttons, children}) => {
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
          <View style={styles.buttons}>
            <View style={styles.buttonWrapper}>
              {!!buttons[0] && (
                <Button mode="elevated" style={styles.button} {...buttons[0]}>
                  {buttons[0]?.title || ''}
                </Button>
              )}
            </View>
            <View style={styles.buttonWrapper}>
              {!!buttons[1] && (
                <Button
                  mode="outlined"
                  style={styles.button}
                  textColor={colors.white}
                  {...buttons[1]}>
                  {buttons[1]?.title || ''}
                </Button>
              )}
            </View>
          </View>
        </View>
        {children}
      </LinearGradient>
    );
  },
);
