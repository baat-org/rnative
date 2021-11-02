import React from 'react';
import { View, Button, AsyncStorage, Text, TextInput } from 'react-native';
import GlobalStyles from '../../GlobalStyles'
import API from '../../api/API';

class ChannelsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '', 
      password: '',
      errorMessage: '',
    }
  };

  onSignup() {
    const { email, name, password } = this.state;

    API.signup(email, name, password,
      (userToken) => {
        AsyncStorage.setItem('userToken', userToken).then(() => {
          this.props.navigation.navigate('Home');
        });
      },
      (error) => {
        this.setState({ errorMessage: error });
      })
  }


  render() {
    return (
      <View style={GlobalStyles.container}>
        <Text style={GlobalStyles.error}>{this.state.errorMessage}</Text>
        <TextInput
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
          placeholder={'Email'}
          style={GlobalStyles.input}
        />
        <TextInput
          value={this.state.name}
          onChangeText={(name) => this.setState({ name })}
          placeholder={'Name'}
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
            title={'Signup'}
            style={GlobalStyles.input}
            onPress={this.onSignup.bind(this)}
          />
          <Text>  </Text>
          <Button
            title={'Cancel'}
            style={GlobalStyles.input}
            onPress={() => this.props.navigation.navigate("Login")}
          />
        </View>

      </View>
    );
  }
}

export default ChannelsScreen