import {ViewStyle} from 'react-native';

export const getSizeStyle = (
  width?: number | `${number}%`,
  height?: number,
): ViewStyle => {
  const style: ViewStyle = {};

  if (
    typeof width === 'number' ||
    (typeof width === 'string' && width.endsWith('%'))
  ) {
    style.width = width;
  }

  if (typeof height === 'number') {
    style.height = height;
  }

  return style;
};
