import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';

export const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.blue,
    width: '80%',
  },

  textLeft: {
    flexShrink: 1,
    color: colors.white,
  },

  textRight: {
    color: colors.white,
  },
});
