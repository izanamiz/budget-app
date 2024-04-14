import HomeScreen from '@/pages/home';
import ChartScreen from '@/pages/chart';
import HistoryScreen from '@/pages/history';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Screens} from './screens';

const Tab = createBottomTabNavigator();

const BottomTabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={Screens.Home}>
      <Tab.Screen name={Screens.History} component={HistoryScreen} />
      <Tab.Screen name={Screens.Home} component={HomeScreen} />
      <Tab.Screen name={Screens.Chart} component={ChartScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNav;
