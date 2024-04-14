import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Screens} from './screens';
import BottomTabNav from './BottomTabNav';
import SplashScreen from '@/pages/splash';
import SignUp from '@/pages/auth/features/SignUp';
import SignIn from '@/pages/auth/features/SignIn';
import Profile from '@/pages/auth/features/Profile';
import WelcomeScreen from '@/pages/welcome';

const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        headerShown: false,
      }}
      initialRouteName={Screens.Splash}>
      <Stack.Screen name={Screens.Splash} component={SplashScreen} />
      <Stack.Screen name={Screens.Tabs} component={BottomTabNav} />
      <Stack.Screen name={Screens.Welcome} component={WelcomeScreen} />
      <Stack.Screen name={Screens.SignUp} component={SignUp} />
      <Stack.Screen name={Screens.SignIn} component={SignIn} />
      <Stack.Screen name={Screens.Profile} component={Profile} />
    </Stack.Navigator>
  );
}

export default StackNavigator;
