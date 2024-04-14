import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useCallback} from 'react';
import Background1 from '@/assets/media/welcome/Background1.svg';
import ColorfulLogo2 from '@/assets/media/welcome/ColorfulLogo2.svg';
import RightArrow1 from '@/assets/media/redirect/RightArrow1.svg';
import RightArrow2 from '@/assets/media/redirect/RightArrow2.svg';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@/constants/dimensions';
import colors from '@/constants/colors';
import {useNavigation} from '@react-navigation/native';
import {ScreenProps, Screens} from '@/navigation/screens';

const WelcomeScreen = () => {
  const navigation =
    useNavigation<ScreenProps<Screens.Welcome>['navigation']>();

  const handleSignIn = useCallback(() => {
    navigation.navigate(Screens.SignIn);
  }, []);

  const handleSignUp = useCallback(() => {
    navigation.navigate(Screens.SignUp);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.bg}>
        <Background1 width={WINDOW_WIDTH} />
      </View>

      <View style={styles.header}>
        <ColorfulLogo2 />
        <Text style={styles.headerText}>Welcome</Text>
      </View>

      <View style={styles.btnGroup}>
        <TouchableOpacity
          style={[styles.btnContainer, styles.btnSignIn]}
          onPress={handleSignIn}>
          <Text style={styles.btnText}>Sign in</Text>
          <RightArrow1 />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btnContainer, styles.btnSignUp]}
          onPress={handleSignUp}>
          <Text style={[styles.btnText, styles.btnSignUpText]}>Sign up</Text>
          <RightArrow2 />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    zIndex: -1,
  },
  header: {
    marginTop: 30,
    marginLeft: 30,
  },
  headerText: {
    color: colors.white,
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: 28,
    marginLeft: 50,
    letterSpacing: 2,
  },
  btnGroup: {
    flex: 1,
    justifyContent: 'flex-end',
    gap: 25,
    padding: 30,
  },
  btnContainer: {
    padding: 25,
    borderRadius: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
  },
  btnText: {
    color: colors.white,
    fontFamily: 'SF-Pro-Display-Regular',
    fontSize: 20,
    letterSpacing: 1,
  },
  btnSignIn: {
    backgroundColor: colors.blue,
    borderColor: colors.blue,
  },
  btnSignUp: {
    backgroundColor: 'transparent',
    borderColor: colors.black,
  },
  btnSignUpText: {
    color: colors.blue,
  },
});

export default WelcomeScreen;
