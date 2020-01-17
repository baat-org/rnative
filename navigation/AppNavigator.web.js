import { createBrowserApp } from '@react-navigation/web';
import { createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import CheckAuthScreen from '../screens/login/CheckAuthScreen';
import LoginScreen from '../screens/login/LoginScreen'
import SignupScreen from '../screens/login/SignupScreen'
import HomeScreen from '../screens/home/HomeScreen'
import SideMenuScreen from '../screens/home/SideMenuScreen'

const AuthNavigatorStack = createStackNavigator(
  {
    Login: LoginScreen,
    Signup: SignupScreen
  }
);

const HomeDrawerNavigator = createDrawerNavigator(
  {
    Home: HomeScreen
  },
  {
    contentComponent: SideMenuScreen
  }
);

const AppSwitchNavigator = createSwitchNavigator(
  {
    CheckAuth: CheckAuthScreen,
    Home: HomeDrawerNavigator,
    Auth: AuthNavigatorStack,
  },
  {
    initialRouteName: 'CheckAuth',
  }
);

AppSwitchNavigator.path = '';

export default createBrowserApp(AppSwitchNavigator, { history: 'hash' });
