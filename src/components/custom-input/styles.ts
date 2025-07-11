import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';
import {extraTypography} from '../../theme/typography';

export const styles = StyleSheet.create({
  inputBase: {
    ...extraTypography.extraLightLarge,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 0,
    textAlignVertical: 'center',
  },

  filled: {
    backgroundColor: colors.darkWhite,
    borderColor: colors.transparent,
  },

  outlined: {
    backgroundColor: colors.transparent,
    borderColor: colors.darkWhite,
  },

  errorBorder: {
    borderColor: colors.red,
  },
});
