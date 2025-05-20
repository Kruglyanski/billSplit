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

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
  },

  button: {
    marginBottom: 12,
    width: 160,
    borderWidth: 1,
    borderColor: colors.white,
  },
});
