import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Screens} from './screens';
import {Image} from 'react-native';
import HomeScreen from '@/pages/home';
import ChartScreen from '@/pages/chart';
import HistoryScreen from '@/pages/history';

const Tab = createBottomTabNavigator();
const sourceList = {
  home: {
    icon: require('@/assets/media/nav/Home.jpg'),
    activeIcon: require('@/assets/media/nav/HomeActive.jpg'),
  },
  chart: {
    icon: require('@/assets/media/nav/Chart.jpg'),
    activeIcon: require('@/assets/media/nav/ChartActive.jpg'),
  },
  history: {
    icon: require('@/assets/media/nav/History.jpg'),
    activeIcon: require('@/assets/media/nav/HistoryActive.jpg'),
  },
};
const BottomTabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 70,
          paddingVertical: 5,
        },
        tabBarLabelStyle: {marginBottom: 10},
      }}
      initialRouteName={Screens.Home}>
      <Tab.Screen
        name={Screens.History}
        component={HistoryScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused
                  ? sourceList.history.activeIcon
                  : sourceList.history.icon
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name={Screens.Home}
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused ? sourceList.home.activeIcon : sourceList.home.icon
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name={Screens.Chart}
        component={ChartScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={
                focused ? sourceList.chart.activeIcon : sourceList.chart.icon
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;
