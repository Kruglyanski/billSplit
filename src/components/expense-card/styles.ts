import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';

export const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    paddingHorizontal: 12,
    marginTop: -24,
    height: 130,
    shadowColor: colors.black,
    shadowOffset: {width: 6, height: -6},
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 12,
  },

  contentWrapper: {
    height: '100%',
    justifyContent: 'space-between',
  },

  cardTitle: {
    color: colors.white,
  },

  cardDate: {
    color: colors.white,
    alignSelf: 'flex-end',
    marginBottom: 12,
  },
});
