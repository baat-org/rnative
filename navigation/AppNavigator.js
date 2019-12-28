import { createAppContainer, createSwitchNavigator, ScrollView } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import CheckAuthScreen from '../screens/login/CheckAuthScreen';
import LoginScreen from '../screens/login/LoginScreen'
import SignupScreen from '../screens/login/SignupScreen'
import ChatScreen from '../screens/home/ChatScreen'
import SideMenuScreen from '../screens/home/SideMenuScreen'


const AuthNavigatorStack = createStackNavigator(
    {
        Login: LoginScreen,
        Signup: SignupScreen
    }
);

const HomeDrawerNavigator = createDrawerNavigator(
    {
        Chat: ChatScreen
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

export default createAppContainer(AppSwitchNavigator);
