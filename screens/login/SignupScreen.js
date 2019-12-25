import React from 'react';
import { View, Button, AsyncStorage, Text, TextInput } from 'react-native';
import GlobalStyles from '../../GlobalStyles'
import { GQL_API_URI } from 'react-native-dotenv';

class SingupScreen extends React.Component {
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

    fetch(GQL_API_URI,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: '{"query": "mutation { signup ( email: \\\"' + email + '\\\", name: \\\"' + name + '\\\", password: \\\"' + password + '\\\", avatarUrl: \\\"\\\")}", "variables": null}',
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson && responseJson.data && responseJson.data.signup) {
          AsyncStorage.setItem('userToken', responseJson.data.signup);
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

export default SingupScreen