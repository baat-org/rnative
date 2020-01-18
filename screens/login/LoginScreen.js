import React from 'react';
import { View, Button, AsyncStorage, Text, TextInput } from 'react-native';
import GlobalStyles from '../../GlobalStyles'
import API from '../../api/API';

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

    API.login(userName, password,
      (userToken) => {
        AsyncStorage.setItem('userToken', userToken);
        this.props.navigation.navigate('Home');
      },
      (error) => {
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