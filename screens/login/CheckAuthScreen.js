import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    View,
} from 'react-native';
import API from '../../api/API';
import GlobalStyles from '../../GlobalStyles';

class CheckAuthScreen extends React.Component { 
    componentDidMount() {
        this._authorize();
    }

    _authorize = async () => {
        const userToken = await AsyncStorage.getItem('userToken');

        if (!userToken) {
            this.props.navigation.navigate('Auth');
        } else {
            if (await API.authorize(userToken)) {
                this.props.navigation.navigate('Home');
            } else {
                this.props.navigation.navigate('Auth');
            }
        }
    };

    // Render any loading content that you like here
    render() {
        return (
            <View style={GlobalStyles.container}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
}
export default CheckAuthScreen
