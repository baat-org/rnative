import React from 'react';
import { Header } from 'react-native-elements';
import { AsyncStorage, Text } from 'react-native';
import { GQL_API_URI } from 'react-native-dotenv';
import GlobalStyles from '../../GlobalStyles';
import { KeyboardAvoidingView } from 'react-native';
import ChatScreen from './ChatScreen';
import { TextInput } from 'react-native';
import { ScrollView } from 'react-native';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
    }
  };

  componentDidMount() {
    this._loadchatScreens().then(chatScreens => {
      this.chatScreens = chatScreens;
    });
  }


  _loadchatScreens = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    const chatScreens = {};

    await fetch(GQL_API_URI,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: '{"query": "{ users ( userToken: \\\"' + userToken + '\\\") { id } }", "variables": null, "operationName":null}',
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson && responseJson.data && responseJson.data.users) {
          const users = responseJson.data.users;
          for (let i = 0; i < users.length; i++) {
            let userId = users[i].id
            chatScreens[userId] = <ChatScreen recipientUserId={userId} />
          }
        }
      })
      .catch((error) => {
        this.setState({ errorMessage: error });
      });

    return chatScreens;
  };

  _signOut() {
    AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  }

  render() {
    this.props.navigation.closeDrawer();
    const recipientUserId = this.props.navigation.getParam('recipientUserId');
    const reciepientFullName = this.props.navigation.getParam('reciepientFullName');
    const chatScreen = recipientUserId && this.chatScreens && this.chatScreens[recipientUserId] ? this.chatScreens[recipientUserId] : <Text>Please select user from side menu.</Text>;

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <Header
          leftComponent={{ icon: 'menu', color: '#fff', onPress: this.props.navigation.toggleDrawer }}
          centerComponent={{ text: reciepientFullName, style: { color: '#fff' } }}
          rightComponent={{ text: 'Sign out', style: { color: '#fff' }, onPress: () => this._signOut() }}
        />
        <Text style={GlobalStyles.error}>{this.state.errorMessage}</Text>
        {chatScreen}
      </KeyboardAvoidingView>
    );
  }
}

export default HomeScreen
