import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';

export const styles = StyleSheet.create({
  card: {
    height: 130,
    paddingHorizontal: 12,
    marginTop: -24,
    borderRadius: 16,
    shadowColor: colors.black,
    shadowOffset: {width: 6, height: -6},
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 12,
  },

  contentWrapper: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardTitle: {
    marginTop: -24,
    color: colors.white,
    textAlign: 'center',
  },

  cardDate: {
    position: 'absolute',
    bottom: 12,
    color: colors.white,
  },
});
