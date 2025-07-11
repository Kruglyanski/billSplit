import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';

export const styles = StyleSheet.create({
  contentStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  button: {
    borderRadius: 8,
    justifyContent: 'center',
  },

  primary: {
    backgroundColor: colors.lightMain,
  },

  secondary: {
    backgroundColor: colors.darkWhite,
  },

  primaryLabel: {
    color: colors.white,
    fontSize: 16,
  },

  secondaryLabel: {
    color: colors.darkGray,
    fontSize: 16,
  },

  image: {
    width: 20,
    height: 20,
  },
});
