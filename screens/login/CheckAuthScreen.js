import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    View,
} from 'react-native';
import { GQL_API_URI } from 'react-native-dotenv';

class CheckAuthScreen extends React.Component {
    componentDidMount() {
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');

        if (!userToken) {
            this.props.navigation.navigate('Auth');
        } else {
            fetch(GQL_API_URI,
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: '{"query": "mutation { validateUserToken ( userToken: \\\"' + userToken + '\\\")}", "variables": null}',
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson && responseJson.data && responseJson.data.validateUserToken) {
                        AsyncStorage.setItem('userToken', responseJson.data.validateUserToken);
                        this.props.navigation.navigate('Home');
                    } else {
                        this.props.navigation.navigate('Auth');
                    }
                })
                .catch((error) => {
                    console.error(error);
                    this.props.navigation.navigate('Auth');
                });
        }
    };

    // Render any loading content that you like here
    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}
export default CheckAuthScreen
