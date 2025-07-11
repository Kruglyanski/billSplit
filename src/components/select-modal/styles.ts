import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    width: '85%',
    maxHeight: '80%',
    backgroundColor: colors.darkWhite,
    borderRadius: 12,
    padding: 16,
  },

  title: {
    marginBottom: 12,
    textAlign: 'center',
    color: colors.lightMain,
  },

  list: {
    maxHeight: 300,
    marginBottom: 16,
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },

  button: {
    minWidth: 80,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },

  itemSelected: {
    backgroundColor: colors.lightGray,
  },

  itemLabel: {
    flex: 1,
    fontSize: 16,
    color: colors.darkGray,
  },

  itemLabelSelected: {
    color: colors.lightMain,
  },

  icon: {
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
