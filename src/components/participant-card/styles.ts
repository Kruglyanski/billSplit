import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#0a6e91',
    flex: 1,
  },

  title: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 12,
    fontSize: 16,
  },

  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomStartRadius: 22,
    borderTopStartRadius: 22,
    borderRadius: 12,
    marginBottom: 8,
  },

  itemSelected: {
    backgroundColor: colors.lightMain,
  },

  avatar: {
    backgroundColor: colors.orange,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  avatarText: {
    color: colors.white,
  },

  textContainer: {
    flex: 1,
  },

  name: {
    color: colors.white,
  },

  email: {
    color: colors.gray,
  },
});
