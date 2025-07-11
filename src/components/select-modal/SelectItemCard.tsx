import React, {memo, useCallback} from 'react';
import { TouchableOpacity, View} from 'react-native';
import {Icon, Text} from 'react-native-paper';
import {IOption} from './SelectModal';
import {colors} from '../../theme/colors';
import { styles } from './styles';

interface IProps<T> {
  item: IOption<T>;
  selected: boolean;
  handleSelect: (id: T) => void;
  multiple?: boolean;
}

function SelectItemCardComponent<T>({
  item,
  selected,
  handleSelect,
  multiple = false,
}: IProps<T>) {
  const onPress = useCallback(() => {
    handleSelect(item.value);
  }, [item, handleSelect]);

  return (
    <TouchableOpacity
      style={[styles.item, selected && styles.itemSelected]}
      onPress={onPress}>
      <Text style={[styles.itemLabel, selected && styles.itemLabelSelected]}>
        {item.label}
      </Text>
      {multiple && (
        <View style={styles.icon}>
          {selected && <Icon size={22} source={'check'} color={colors.green} />}
        </View>
      )}
    </TouchableOpacity>
  );
}

export const SelectItemCard = memo(
  SelectItemCardComponent,
) as typeof SelectItemCardComponent;
