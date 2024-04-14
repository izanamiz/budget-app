import React from 'react';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import SplashScreen from '@/pages/splash';
import {getToken, removeToken} from '@/utils';
import useSWR from 'swr';
import {TOKEN_KEY} from '@/constants';

const MainNavigator = () => {
  const {data: storedToken, isLoading} = useSWR(TOKEN_KEY, getToken);
  // removeToken();
  if (isLoading) {
    return <SplashScreen />;
  }

  if (!storedToken) {
    return <AuthNavigator />;
  }
  return <AppNavigator />;
};

export default MainNavigator;
