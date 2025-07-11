import React, {FC, memo, useMemo} from 'react';
import {
  Image,
  StyleProp,
  ViewStyle,
  ImageStyle,
  ActivityIndicator,
} from 'react-native';
import {Button} from 'react-native-paper';
import {styles} from './styles';
import {getSizeStyle} from '../../utils/helpers/get-size-style';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';
import {colors} from '../../theme/colors';

interface IProps {
  onPress: () => void;
  type: 'primary' | 'secondary';
  title?: string;
  icon?: IconSource;
  image?: string | number | {uri: string};
  width?: number | `${number}%`;
  height?: number;
  disabled?: boolean;
  loading?: boolean;
}

export const CustomButton: FC<IProps> = memo(
  ({onPress, type, title, icon, image, width, height, disabled, loading}) => {
    const containerStyle: StyleProp<ViewStyle> = [
      styles.button,
      type === 'primary' ? styles.primary : styles.secondary,
      getSizeStyle(width, height),
    ];

    const labelStyle =
      type === 'primary' ? styles.primaryLabel : styles.secondaryLabel;

    const iconNode = useMemo(() => {
      if (loading) {
        return () => (
          <ActivityIndicator
            size={18}
            color={type === 'primary' ? colors.darkWhite : colors.darkGray}
          />
        );
      }

      if (image) {
        return () => (
          <Image
            source={typeof image === 'string' ? {uri: image} : image}
            style={styles.image as ImageStyle}
            resizeMode="contain"
          />
        );
      }

      return icon;
    }, [loading, image, type, icon]);

    return (
      <Button
        mode="contained"
        onPress={onPress}
        style={containerStyle}
        labelStyle={labelStyle}
        contentStyle={styles.contentStyle}
        disabled={disabled || loading}
        icon={iconNode}>
        {title}
      </Button>
    );
  },
);
