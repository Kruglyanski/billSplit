import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  modal: {
    padding: 20,
    borderRadius: 8,
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: '90%',
    minHeight: '20%',
    maxHeight: '60%',
  },

  text: {
    marginTop: 12,
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },

  button: {
    minWidth: 80,
  },
});
