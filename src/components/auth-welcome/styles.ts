import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';

export const styles = StyleSheet.create({
  animated: {
    height: 400,
    alignItems: 'center',
  },

  title: {
    color: colors.lightMain,
  },

  buttons: {
    marginTop: 60,
    gap: 16,
  },

  button: {
    marginHorizontal: 10,
    width: 150,
  },
});
