import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ScreenProps, Screens} from '@/navigation/screens';
import ColorfulLogo from '@/assets/media/welcome/ColorfulLogo.svg';

const SplashScreen = () => {
  const navigation = useNavigation<ScreenProps<Screens.Splash>['navigation']>();

  const handleNavigate = useCallback(() => {
    navigation.navigate(Screens.Welcome);
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleNavigate}>
        <ColorfulLogo />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SplashScreen;
