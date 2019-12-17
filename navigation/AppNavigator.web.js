import { createBrowserApp } from '@react-navigation/web';
import { createSwitchNavigator } from 'react-navigation';

import CheckAuthScreen from '../screens/CheckAuthScreen';
import HomeDrawerNavigator from './HomeDrawerNavigator';
import AuthNavigatorStack from './AuthNavigatorStack';

const switchNavigator = createSwitchNavigator(
  {
    CheckAuth: CheckAuthScreen,
    Home: HomeDrawerNavigator,
    Auth: AuthNavigatorStack,
  },
  {
    initialRouteName: 'CheckAuth',
  }
);
switchNavigator.path = '';

export default createBrowserApp(switchNavigator, { history: 'hash' });
