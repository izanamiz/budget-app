import {BaseToast, ErrorToast} from 'react-native-toast-message';

export const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{borderLeftColor: 'transparent'}}
      text1Style={{
        fontFamily: 'SF-Pro-Display-Bold',
        fontSize: 14,
      }}
      text2Style={{
        fontFamily: 'SF-Pro-Display-Medium',
        fontSize: 12,
      }}
    />
  ),

  error: props => (
    <ErrorToast
      {...props}
      style={{borderLeftColor: 'transparent'}}
      text1Style={{
        fontFamily: 'SF-Pro-Display-Bold',
        fontSize: 14,
      }}
      text2Style={{
        fontFamily: 'SF-Pro-Display-Medium',
        fontSize: 12,
      }}
    />
  ),
};
