import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  scrollview: {
    marginTop: 12,
  },

  input: {
    marginBottom: 12,
  },

  label: {
    color: colors.violet,
    marginBottom: 8,
    marginTop: 16,
  },

  splitRow: {
    marginBottom: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: colors.violet,
  },

  userName: {
    marginBottom: 4,
    color: colors.darkGray,
  },

  inputsContainer: {
    flexDirection: 'row',
    gap: 12,
  },

  inputWrapper: {
    flex: 1,
  },

  inputLabel: {
    color: colors.violet,
    marginBottom: 4,
  },

  groupSelector: {
    padding: 12,
    marginVertical: 10,
    borderRadius: 6,
  },
});
