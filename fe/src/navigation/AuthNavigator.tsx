import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Screens} from './screens';
import SignUp from '@/pages/auth/features/SignUp';
import SignIn from '@/pages/auth/features/SignIn';
import WelcomeScreen from '@/pages/welcome';

const Stack = createNativeStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        headerShown: false,
      }}
      initialRouteName={Screens.Welcome}>
      <Stack.Screen name={Screens.Welcome} component={WelcomeScreen} />
      <Stack.Screen name={Screens.SignUp} component={SignUp} />
      <Stack.Screen name={Screens.SignIn} component={SignIn} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
