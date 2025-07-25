import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';

export const styles = StyleSheet.create({
  fabStyle: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: colors.white,
  },

  listHeader: {
    alignSelf: 'center',
    marginVertical: 8,
    color: colors.white,
  },

  listContainer: {
    marginTop: 24,
    paddingBottom: 80,
    borderRadius: 16,
  },

  list: {
    paddingHorizontal: 16,
  },
});
