import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 12,
  },

  label: {
    color: colors.darkWhite,
    marginBottom: 4,
  },

  lang: {
    color: colors.darkWhite,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
});
