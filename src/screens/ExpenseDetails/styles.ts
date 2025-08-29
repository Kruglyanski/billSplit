import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';

export const styles = StyleSheet.create({
  noExpense: {
    flex: 1,
    alignSelf: 'center',
    marginTop: 24,
    color: colors.white,
  },

  scrollview: {
    marginHorizontal: 16,
    paddingBottom: 24,
    gap: 8,
  },

  textWhite: {
    color: colors.white,
  },

  sectionTitle: {
    marginTop: 8,
    color: colors.white,
    textAlign: 'center',
  },
});
