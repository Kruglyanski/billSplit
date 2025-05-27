import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';

export const styles = StyleSheet.create({
  label: {
    color: colors.white,
  },

  splitRow: {
    marginBottom: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: colors.violet,
  },

  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: colors.white,
  },

  userName: {
    color: colors.white,
  },
});
