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

  buttons: {
    flexDirection: 'row',
    gap: 24,
    justifyContent: 'flex-end',
  },

  closeButton: {
    width: 120,
    alignSelf: 'flex-end',
  },

  confirmButton: {
    width: 120,
    alignSelf: 'flex-end',
  },
});
