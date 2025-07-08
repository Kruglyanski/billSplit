import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  inputBase: {
    fontSize: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
  },

  filled: {
    backgroundColor: '#ffffff',
    borderColor: 'transparent',
  },

  outlined: {
    backgroundColor: 'transparent',
    borderColor: '#ffffff',
  },

  errorBorder: {
    borderColor: 'red',
  },
});
