import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Screens} from './screens';
import BottomTabNav from './BottomTabNav';
import Profile from '@/pages/auth/features/Profile';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        headerShown: false,
      }}
      initialRouteName={Screens.Tabs}>
      <Stack.Screen name={Screens.Tabs} component={BottomTabNav} />
      <Stack.Screen name={Screens.Profile} component={Profile} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
