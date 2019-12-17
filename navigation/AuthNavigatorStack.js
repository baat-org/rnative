import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'

export default createStackNavigator(
    {
        Login: LoginScreen,
        Signup: SignupScreen
    }
);
