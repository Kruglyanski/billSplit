import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 12,
  },
  label: {
    color: colors.darkWhite,
    fontSize: 16,
    marginBottom: 4,
  },
  row: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  lang: {
    color: colors.darkWhite,
    marginLeft: 8,
    fontSize: 16,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.darkWhite,
  },
});
