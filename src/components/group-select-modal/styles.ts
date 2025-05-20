import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';

export const styles = StyleSheet.create({
  modalContent: {
    margin: 24,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    maxHeight: '80%',
  },

  card: {
    marginBottom: 12,
    borderRadius: 12,
  },

  list: {
    marginVertical: 16,
  },

  closeButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
});
