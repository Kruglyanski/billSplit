import React, {FC, memo, useMemo} from 'react';
import {
  TextInput,
  StyleProp,
  TextStyle,
  ViewStyle,
  KeyboardTypeOptions,
} from 'react-native';
import {styles} from './styles';
import {colors} from '../../theme/colors';

interface IProps {
  value: string;
  label: string;
  type: 'filled' | 'outlined';
  error?: boolean;
  onChangeText?: (value: string) => void;
  onSubmitEditing?: () => void;
  width?: number | `${number}%`;
  height?: number;
  editable?: boolean;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  borderColor?: string;
}

export const CustomInput: FC<IProps> = memo(
  ({
    value,
    label,
    onChangeText,
    onSubmitEditing,
    error,
    type,
    width = '100%',
    height = 42,
    editable = true,
    keyboardType,
    secureTextEntry = false,
    borderColor,
  }) => {
    const inputStyle = useMemo<StyleProp<TextStyle | ViewStyle>>(
      () => [
        styles.inputBase,
        type === 'outlined' ? styles.outlined : styles.filled,
        {width, height},
        borderColor && {borderColor},
        error && styles.errorBorder,
        {color: error ? colors.red : colors.gray},
      ],
      [type, width, height, error, borderColor],
    );

    return (
      <TextInput
        placeholder={label}
        placeholderTextColor={error ? colors.red : colors.gray}
        style={inputStyle}
        {...{
          value,
          onChangeText,
          editable,
          onSubmitEditing,
          keyboardType,
          secureTextEntry,
        }}
      />
    );
  },
);
