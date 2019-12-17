import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../screens/login/LoginScreen'
import SignupScreen from '../screens/login/SignupScreen'

export default createStackNavigator(
    {
        Login: LoginScreen,
        Signup: SignupScreen
    }
);
