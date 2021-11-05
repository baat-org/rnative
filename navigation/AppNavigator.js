import { createAppContainer, createSwitchNavigator, ScrollView } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import CheckAuthScreen from '../screens/login/CheckAuthScreen';
import LoginScreen from '../screens/login/LoginScreen'
import SignupScreen from '../screens/login/SignupScreen'
import HomeScreen from '../screens/home/HomeScreen'
import SideMenuScreen from '../screens/home/SideMenuScreen'
import DirectsScreen from '../screens/channels/DirectsScreen'
import ChannelsScreen from '../screens/channels/ChannelsScreen'


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
        Directs: DirectsScreen,
        Channels: ChannelsScreen,
    },
    {
        initialRouteName: 'CheckAuth',
    }
);

export default createAppContainer(AppSwitchNavigator);
