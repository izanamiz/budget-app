/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNav from '@/navigation/StackNav';
import Toast from 'react-native-toast-message';
import {toastConfig} from '@/configs/toastconfig';
import 'react-native-gesture-handler';
import { ThemeProvider } from '@rneui/themed';

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ThemeProvider>
        <NavigationContainer>
          <StackNav />
        </NavigationContainer>
        <Toast config={toastConfig} />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default App;
