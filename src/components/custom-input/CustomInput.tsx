import React, {FC, memo} from 'react';
import {TextInput, StyleProp, TextStyle, ViewStyle} from 'react-native';
import {styles} from './styles';
import {colors} from '../../theme/colors';

interface IProps {
  value: string;
  label: string;
  error: boolean;
  type: 'filled' | 'outlined';
  onChangeText: (value: string) => void;
  width?: number | `${number}%`;
  height?: number;
}

export const CustomInput: FC<IProps> = memo(
  ({value, label, onChangeText, error, type, width = '100%', height = 42}) => {
    const isOutlined = type === 'outlined';

    const inputStyle: StyleProp<TextStyle | ViewStyle> = [
      styles.inputBase,
      isOutlined ? styles.outlined : styles.filled,
      {width, height},
      error && styles.errorBorder,
      {color: error ? colors.red : colors.gray},
    ];

    return (
      <TextInput
        placeholder={label}
        placeholderTextColor={error ? colors.red : colors.gray}
        style={inputStyle}
        {...{value, onChangeText}}
      />
    );
  },
);
