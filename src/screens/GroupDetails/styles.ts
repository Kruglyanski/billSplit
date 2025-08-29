import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';

export const styles = StyleSheet.create({
  listContainer: {
    alignItems: 'center',
    gap: 4,
    marginTop: 12,
    paddingBottom: 72,
    paddingHorizontal: 16,
  },

  switchButtonWrapper: {
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 16,
  },

  tabsWrapper: {
    flex: 1,
    width: '100%',
  },

  tabContent: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },

  balancesText: {
    marginTop: 20,
    textAlign: 'center',
  },

  fabStyle: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: colors.white,
  },
});
