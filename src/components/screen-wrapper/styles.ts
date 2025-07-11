import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    backgroundColor: colors.darkMain,
    height: 80,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    color: colors.darkWhite,
    textAlign: 'center',
    textTransform: 'uppercase',
  },

  buttonWrapper: {
    width: 60,
    alignItems: 'center',
  },

  button: {
    width: 34,
    borderWidth: 1,
    borderColor: colors.darkWhite,
  },
});
