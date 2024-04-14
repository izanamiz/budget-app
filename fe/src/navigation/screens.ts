import {NativeStackScreenProps} from '@react-navigation/native-stack';

enum Screens {
  Splash = 'Splash',
  Tabs = 'Tabs',
  Home = 'Home',
  Chart = 'Chart',
  History = 'History',
  Welcome = 'Welcome',
  SignUp = 'SignUp',
  SignIn = 'SignIn',
  Profile = 'Profile',
}

type RootStackParamList = {
  [Screens.Splash]: undefined;
  [Screens.Tabs]: undefined;
  [Screens.Home]: undefined;
  [Screens.Chart]: undefined;
  [Screens.History]: undefined;
  [Screens.Welcome]: undefined;
  [Screens.SignUp]: undefined;
  [Screens.SignIn]: undefined;
  [Screens.Profile]: undefined;
};

type ScreenProps<
  T extends keyof RootStackParamList,
  I extends string | undefined = undefined,
> = NativeStackScreenProps<RootStackParamList, T, I>;

type RouteList = {name: Screens}[];

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {
      //
    }
  }
}

export {Screens};

export type {RootStackParamList, RouteList, ScreenProps};
