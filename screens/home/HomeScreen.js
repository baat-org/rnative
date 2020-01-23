import React from 'react';
import { Header } from 'react-native-elements';
import { AsyncStorage, Text } from 'react-native';
import GlobalStyles from '../../GlobalStyles';
import { KeyboardAvoidingView } from 'react-native';
import ChatScreen from './ChatScreen';
import API from '../../api/API';
import { WEBSOCKETS_URI } from 'react-native-dotenv';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: '',
      users: [],
      chatMessages: {}
    }
  };

  componentDidMount() {
    API.fetchAllUsers().then(users => {
      this.setState({ users: users });
    });

    this._createWebSocket();
  }

  _createWebSocket = async () => {
    const ws = new WebSocket(WEBSOCKETS_URI);
    const userToken = await AsyncStorage.getItem('userToken');

    ws.onmessage = function (event) {
      const replyMessage = JSON.parse(event.data),
            senderUserId = replyMessage.senderUserId,
            textMessage = replyMessage.textMessage;
      
      if (senderUserId && textMessage && this.chatScreens && this.chatScreens[senderUserId]) {
        const message = {senderUserId: senderUserId, textMessage: textMessage};
        const chatMessages = this.state.chatMessages;
        const messages = chatMessages[senderUserId] || [];
        messages.append(message);
        this.setState({chatMessages});
      }
    };

    ws.onclose = function () {
      console.log("Socket closed");
    };

    ws.onopen = function () {
      // TODO may want to do it as part of Connect
      ws.send(userToken);
      console.log("Connected Home Screen");
    };
  }

  _signOut() {
    AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  }

  render() {
    console.log("home screen", this.props, this.state)
    this.props.navigation.closeDrawer();

    const userId = this.props.navigation.getParam('userId');
    const fullName = this.props.navigation.getParam('fullName');

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <Header
          leftComponent={{ icon: 'menu', color: '#fff', onPress: this.props.navigation.toggleDrawer }}
          centerComponent={{ text: fullName, style: { color: '#fff' } }}
          rightComponent={{ text: 'Sign out', style: { color: '#fff' }, onPress: () => this._signOut() }}
        />
        <Text style={GlobalStyles.error}>{this.state.errorMessage}</Text>
        {this.state.users.map((user, key) =>
          <ChatScreen
            show={user.id == userId}
            userId={user.id}
            chatMessages={this.state.chatMessages[user.id]}
            key={key}
          />)}
      </KeyboardAvoidingView>
    );
  }
}

export default HomeScreen
