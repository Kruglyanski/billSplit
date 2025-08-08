import {FC, memo} from 'react';
import {DimensionValue, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {Text} from 'react-native-paper';

export const TransparentItemCard: FC<{
  rightText: string;
  leftText: string;
  onPress: () => void;
  width?: DimensionValue;
}> = memo(({rightText, leftText, onPress, width}) => {
  return (
    <TouchableOpacity style={[styles.cardContainer, {width}]} {...{onPress}}>
      <Text variant="bodyLarge" style={styles.textLeft}>
        {leftText}
      </Text>
      <Text variant="bodyLarge" style={styles.textRight}>
        {rightText}
      </Text>
    </TouchableOpacity>
  );
});
