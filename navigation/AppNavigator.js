import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import CheckAuthScreen from '../screens/CheckAuthScreen';
import HomeDrawerNavigator from './HomeDrawerNavigator';
import AuthNavigatorStack from './AuthNavigatorStack';

export default createAppContainer(
    createSwitchNavigator(
        {
            CheckAuth: CheckAuthScreen,
            Home: HomeDrawerNavigator,
            Auth: AuthNavigatorStack,
        },
        {
            initialRouteName: 'CheckAuth',
        }
    )
);
