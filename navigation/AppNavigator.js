import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import CheckAuthScreen from '../screens/CheckAuthScreen';
import HomeNavigatorStack from './HomeNavigatorStack';
import AuthNavigatorStack from './AuthNavigatorStack';

export default createAppContainer(
  createSwitchNavigator({
    CheckAuth: CheckAuthScreen,
    Home: HomeNavigatorStack,
    Auth: AuthNavigatorStack,
  })
);
