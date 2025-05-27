import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },

  header: {
    backgroundColor: colors.violet,
    borderBottomEndRadius: 36,
    borderBottomStartRadius: 36,
    height: 140,
    paddingTop: 16,
    marginHorizontal: -16,
    justifyContent: 'space-between',
  },

  welcome: {
    marginBottom: 20,
    color: colors.white,
    textAlign: 'center',
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
  },

  buttonWrapper: {
    marginBottom: 12,
    width: 160,
  },

  button: {
    width: 160,
    borderWidth: 1,
    borderColor: colors.white,
  },
});
