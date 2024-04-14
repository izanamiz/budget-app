import colors from '@/constants/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 30,
    left: 30,
    zIndex: 2,
  },
  headerText: {
    color: colors.white,
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: 28,
    marginLeft: 50,
    letterSpacing: 2,
  },
  form: {
    paddingHorizontal: 20,
  },
  formTitle: {
    marginHorizontal: 10,
    marginVertical: 30,
    color: colors.black,
    fontFamily: 'SF-Pro-Display-Bold',
    fontSize: 28,
    fontWeight: '600',
  },
  errorText: {
    color: colors.red,
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: 16,
    margin: 10,
    fontWeight: '500',
  },
  signUpWrapper: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 5,
  },
  signUpText: {
    color: colors.blue,
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: 14,
    alignSelf: 'flex-end',
  },
  btnGroup: {
    marginVertical: 30,
    marginHorizontal: 30,
  },
  btnContainer: {
    padding: 25,
    borderRadius: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: colors.blue,
    borderColor: colors.blue,
  },
  btnText: {
    color: colors.white,
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: 20,
    letterSpacing: 1,
  },
});
