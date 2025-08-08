import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    height: 40,
    width: '100%',
    marginBottom: 12,
  },

  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.blue,
    backgroundColor: 'transparent',
  },

  leftButton: {
    borderTopStartRadius: 12,
    borderBottomStartRadius: 12,
    borderTopEndRadius: 2,
    borderBottomEndRadius: 2,
  },

  rightButton: {
    borderTopEndRadius: 12,
    borderBottomEndRadius: 12,
    borderTopStartRadius: 2,
    borderBottomStartRadius: 2,
  },

  active: {
    backgroundColor: colors.blue,
  },

  buttonText: {
    color: colors.white,
  },
});
