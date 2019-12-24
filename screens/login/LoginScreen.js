import React from 'react';
import { StyleSheet, View, Button, AsyncStorage, Text, TextInput } from 'react-native';
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
      <View style={styles.container}>
        <Text style={styles.error}>{this.state.errorMessage}</Text>
        <TextInput
          value={this.state.userName}
          onChangeText={(userName) => this.setState({ userName })}
          placeholder={'Username'}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />

        <Button
          title={'Login'}
          style={styles.input}
          onPress={this.onLogin.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  error: {
    padding: 10,
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen