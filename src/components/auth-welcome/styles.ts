import {StyleSheet} from 'react-native';
import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  animated: {
    height: 400,
    alignItems: 'center',
  },

  title: {
    color: colors.white,
  },

  name: {
    color: colors.white,
    marginBottom: 36,
  },

  buttons: {
    flexDirection: 'row',
    gap: 10,
  },

  button: {
    marginHorizontal: 10,
    width: 150,
  },
});
