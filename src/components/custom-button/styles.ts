import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  contentStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  button: {
    borderRadius: 8,
    justifyContent: 'center',
  },

  primary: {
    backgroundColor: '#1991d1',
  },

  secondary: {
    backgroundColor: '#ffffff',
  },

  primaryLabel: {
    color: '#ffffff',
    fontSize: 16,
  },

  secondaryLabel: {
    color: '#000000',
    fontSize: 16,
  },

  image: {
    width: 20,
    height: 20,
  },
});
