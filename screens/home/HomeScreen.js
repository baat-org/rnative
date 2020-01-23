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
      currentUser: {},
      users: [],
      usersById: {},
      chatMessages: {}
    }
  };

  componentDidMount() {
    API.fetchAllUsers().then(users => {
      let usersById = {};

      for (let i = 0; i < users.length; i++) {
        usersById[users[i].id] = users[i];
      }

      this.setState({ usersById: usersById, users: users });
    });

    API.getCurrentUser().then(user => {
      this.setState({ currentUser: user });
    });

    this._createWebSocket();
  }

  _createWebSocket = async () => {
    const ws = new WebSocket(WEBSOCKETS_URI);
    const userToken = await AsyncStorage.getItem('userToken');
    const that = this;

    ws.onmessage = function (event) {
      const message = JSON.parse(event.data),
        userId = message.senderUserId,
        textMessage = message.textMessage;

      that.handleReceivedMessage({ userId, textMessage });
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

  handleReceivedMessage(message) {
    if (message && message.userId && message.textMessage) {
      const fromUser = this.state.usersById[message.userId];
      const textMessage = message.textMessage;
      const chatMessages = this.state.chatMessages;
      const messages = chatMessages[message.userId] || [];

      messages.push({ fromUser, textMessage });
      chatMessages[message.userId] = messages;

      this.setState({ chatMessages });
    }
  };

  handleSentMessage(message) {
    if (message && message.userId && message.textMessage) {
      const fromUser = this.state.currentUser;
      const textMessage = message.textMessage;
      const chatMessages = this.state.chatMessages;
      const messages = chatMessages[message.userId] || [];

      messages.push({ fromUser, textMessage });
      chatMessages[message.userId] = messages;

      this.setState({ chatMessages });
    }
  };

  _signOut() {
    AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  }

  render() {
    this.props.navigation.closeDrawer();

    const userId = this.props.navigation.getParam('userId');
    const headerMessage = 'Hi ' + this.state.currentUser.fullName + ', Chat with ' + this.props.navigation.getParam('fullName');

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <Header
          leftComponent={{ icon: 'menu', color: '#fff', onPress: this.props.navigation.toggleDrawer }}
          centerComponent={{ text: headerMessage, style: { color: '#fff' } }}
          rightComponent={{ text: 'Sign out', style: { color: '#fff' }, onPress: () => this._signOut() }}
        />
        <Text style={GlobalStyles.error}>{this.state.errorMessage}</Text>
        {this.state.users.map((user, key) =>
          <ChatScreen
            show={user.id == userId}
            userId={user.id}
            currentUserId={this.state.currentUser.id}
            messages={this.state.chatMessages[user.id] || []}
            onSend={(message) => this.handleSentMessage(message)}
            key={key}
          />)}
      </KeyboardAvoidingView>
    );
  }
}

export default HomeScreen
