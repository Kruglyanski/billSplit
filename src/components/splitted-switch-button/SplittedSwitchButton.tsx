import {FC, memo} from 'react';
import {DimensionValue, View, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {Text} from 'react-native-paper';

export enum EActiveButton {
  left = 'left',
  right = 'right',
}

interface IProps {
  containerWidth?: DimensionValue;
  active: EActiveButton;
  onRightPress: () => void;
  onLeftPress: () => void;
  rigthButtonText: string;
  leftButtonText: string;
}

export const SplittedSwitchButton: FC<IProps> = memo(
  ({
    containerWidth,
    active,
    onRightPress,
    onLeftPress,
    rigthButtonText,
    leftButtonText,
  }) => {
    return (
      <View style={[styles.container, {width: containerWidth}]}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.leftButton,
            active === EActiveButton.left && styles.active,
          ]}
          onPress={onLeftPress}>
          <Text variant="bodyLarge" style={styles.buttonText}>
            {leftButtonText}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            styles.rightButton,
            active === EActiveButton.right && styles.active,
          ]}
          onPress={onRightPress}>
          <Text variant="bodyLarge" style={styles.buttonText}>
            {rigthButtonText}
          </Text>
        </TouchableOpacity>
      </View>
    );
  },
);
