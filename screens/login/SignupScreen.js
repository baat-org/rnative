import React from 'react';
import { StyleSheet, View, Button, AsyncStorage, Text, TextInput } from 'react-native';
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
      <View style={styles.container}>
        <Text style={styles.error}>{this.state.errorMessage}</Text>
        <TextInput
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
          placeholder={'Email'}
          style={styles.input}
        />
        <TextInput
          value={this.state.name}
          onChangeText={(name) => this.setState({ name })}
          placeholder={'Name'}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />

        <View style={styles.row}>
          <Button
            title={'Signup'}
            style={styles.input}
            onPress={this.onSignup.bind(this)}
          />
          <Text>  </Text>
          <Button
            title={'Cancel'}
            style={styles.input}
            onPress={() => this.props.navigation.navigate("Login")}
          />
        </View>

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
  row: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  button: {
    padding: 10,
    marginBottom: 10,
  },
  error: {
    padding: 10,
    color: 'red',
    marginBottom: 10,
  },
});

export default SingupScreen