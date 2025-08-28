import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  scrollview: {
    margin: 16,
    gap: 16,
  },

  label: {
    color: colors.violet,
    marginBottom: 8,
    marginTop: 16,
  },

  splitRow: {
    marginBottom: 12,
    paddingVertical: 8,
  },

  userName: {
    marginBottom: 4,
    color: colors.white,
  },

  inputsContainer: {
    flexDirection: 'row',
    gap: 12,
  },

  inputWrapper: {
    flex: 1,
  },

  inputLabel: {
    color: colors.white,
    marginBottom: 4,
  },

  highlight: {
    color: colors.yellow,
  },
});
