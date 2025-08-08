import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 16,
  },

  addInviteeContainer: {
    marginTop: 24,
  },

  inviteeListContainer: {
    flex: 1,
    marginTop: 24,
    marginBottom: 12,
  },

  blockTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingLeft: 24,
  },

  blockTitle: {
    marginLeft: 16,
    color: colors.darkWhite,
  },

  addForm: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 12,
  },

  inputFields: {
    flex: 1,
    gap: 8,
  },

  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  addButton: {
    backgroundColor: colors.lightMain,
    borderRadius: 8,
    width: 48,
    height: 42,
    margin: 0,
  },

  flatlist: {
    paddingTop: 12,
    paddingBottom: 80,
  },

  placeholder: {
    color: colors.darkWhite,
    textAlign: 'center',
  },

  createButton: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});
