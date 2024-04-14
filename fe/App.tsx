/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {toastConfig} from '@/configs/toastconfig';
import 'react-native-gesture-handler';
import {ThemeProvider} from '@rneui/themed';
import MainNavigator from '@/navigation/MainNavigator';

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ThemeProvider>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
        <Toast config={toastConfig} />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default App;
