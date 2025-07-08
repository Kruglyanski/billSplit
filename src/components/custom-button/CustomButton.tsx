import React, {FC, memo} from 'react';
import {Image, StyleProp, ViewStyle, ImageStyle} from 'react-native';
import {Button} from 'react-native-paper';
import {styles} from './styles';
import {getSizeStyle} from '../../utils/helpers/get-size-style';

interface IProps {
  onPress: () => void;
  type: 'primary' | 'secondary';
  title?: string;
  icon?: string;
  image?: string;
  width?: number | `${number}%`;
  height?: number;
  disabled?: boolean;
}

export const CustomButton: FC<IProps> = memo(
  ({onPress, type, title, icon, image, width, height, disabled}) => {
    const containerStyle: StyleProp<ViewStyle> = [
      styles.button,
      type === 'primary' ? styles.primary : styles.secondary,
      getSizeStyle(width, height),
    ];

    const labelStyle =
      type === 'primary' ? styles.primaryLabel : styles.secondaryLabel;

    return (
      <Button
        mode="contained"
        onPress={onPress}
        style={containerStyle}
        labelStyle={labelStyle}
        contentStyle={styles.contentStyle}
        disabled={disabled}
        icon={
          image
            ? () => (
                <Image
                  source={typeof image === 'string' ? {uri: image} : image}
                  style={styles.image as ImageStyle}
                  resizeMode="contain"
                />
              )
            : icon
        }>
        {title}
      </Button>
    );
  },
);
