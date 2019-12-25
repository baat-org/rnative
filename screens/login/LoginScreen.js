import React from 'react';
import { View, Button, AsyncStorage, Text, TextInput } from 'react-native';
import GlobalStyles from '../../GlobalStyles'
import { GQL_API_URI } from 'react-native-dotenv';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      password: '',
      errorMessage: '',
    }
  };

  onLogin() {
    const { userName, password } = this.state;

    fetch(GQL_API_URI,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: '{"query": "mutation { authenticate ( userName: \\\"' + userName + '\\\", password: \\\"' + password + '\\\")}", "variables": null}',
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson && responseJson.data && responseJson.data.authenticate) {
          AsyncStorage.setItem('userToken', responseJson.data.authenticate);
          this.props.navigation.navigate('Home');
        } else if (responseJson && responseJson.errors && responseJson.errors.length > 0) {
          this.setState({ errorMessage: responseJson.errors[0].message });
        }
      })
      .catch((error) => {
        this.setState({ errorMessage: error });
      });
  }


  render() {
    return (
      <View style={GlobalStyles.container}>
        <Text style={GlobalStyles.error}>{this.state.errorMessage}</Text>
        <TextInput
          value={this.state.userName}
          onChangeText={(userName) => this.setState({ userName })}
          placeholder={'Username'}
          style={GlobalStyles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          style={GlobalStyles.input}
        />
        <View style={GlobalStyles.row}>
          <Button
            title={'Login'}
            style={GlobalStyles.button}
            onPress={this.onLogin.bind(this)}
          />
          <Text>  </Text>
          <Button
            title={'Signup'}
            style={GlobalStyles.button}
            onPress={() => this.props.navigation.navigate('Signup')}
          />
        </View>
      </View>
    );
  }
}

export default LoginScreen