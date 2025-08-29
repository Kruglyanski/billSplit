import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  scrollview: {
    margin: 16,
    paddingBottom: 24,
    gap: 8,
  },

  label: {
    color: colors.white,
  },

  splitRow: {
    marginBottom: 12,
    paddingVertical: 8,
  },

  listLabel: {
    marginTop: 8,
    textAlign: 'center',
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
