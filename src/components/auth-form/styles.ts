import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';

export const styles = StyleSheet.create({
  animatedWrapper: {
    width: '80%',
  },

  formWrapper: {
    alignItems: 'center',
    height: 400,
  },

  input: {
    width: 300,
    marginBottom: 8,
    borderRadius: 36,
    color: colors.white,
  },

  button: {
    width: 200,
    marginTop: 8,
  },

  subheader: {
    marginBottom: 40,
    color: colors.white,
  },

  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 4,
    width: '60%',
  },
});
