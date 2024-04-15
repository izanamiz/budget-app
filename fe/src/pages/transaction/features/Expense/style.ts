import colors from '@/constants/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    gap: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: colors.black,
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: 16,
  },
  textinput: {
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
    flex: 1,
  },
  categoryImg: {
    backgroundColor: colors.btnDisable,
    width: 28,
    height: 28,
    borderRadius: 28,
  },
  btnAdd: {
    backgroundColor: colors.red,
    width: 28,
    height: 28,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
  },
  textBlue: {
    color: colors.blue,
  },
});
