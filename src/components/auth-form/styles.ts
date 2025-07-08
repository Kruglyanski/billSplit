import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';

export const styles = StyleSheet.create({
  animatedWrapper: {
    width: '100%',
  },

  formWrapper: {
    alignItems: 'center',
    height: 400,
  },

  button: {
    width: 200,
    marginTop: 8,
  },

  subheader: {
    marginBottom: 60,
    color: colors.lightMain,
  },

  errorWrapper: {
    width: 300,
    height: 18,
  },

  errorText: {
    color: colors.red,
    marginBottom: 4,
    marginLeft: 8,
  },

  buttons: {
    gap: 15,
    marginTop: 24,
  },
});
