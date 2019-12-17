import { createBrowserApp } from '@react-navigation/web';
import { createSwitchNavigator } from 'react-navigation';

import CheckAuthScreen from '../screens/CheckAuthScreen';
import HomeNavigatorStack from './HomeNavigatorStack';
import AuthNavigatorStack from './AuthNavigatorStack';

const switchNavigator = createSwitchNavigator(
  {
    CheckAuth: CheckAuthScreen,
    Home: HomeNavigatorStack,
    Auth: AuthNavigatorStack,
  },
  {
    initialRouteName: 'CheckAuth',
  }
);
switchNavigator.path = '';

export default createBrowserApp(switchNavigator, { history: 'hash' });
