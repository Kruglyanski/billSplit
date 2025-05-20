import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';

export const styles = StyleSheet.create({
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
    backgroundColor: colors.white,
  },

  listHeader: {
    alignSelf: 'center',
    color: colors.white,
    marginVertical: 8,
  },

  listContainer: {
    marginTop: 24,
  },

  list: {
    borderRadius: 16,
  },
});
