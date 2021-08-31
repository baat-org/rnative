import React from 'react';
import { Header } from 'react-native-elements';
import { AsyncStorage, Text } from 'react-native';
import GlobalStyles from '../../GlobalStyles';
import { KeyboardAvoidingView } from 'react-native';
import ChatScreen from './ChatScreen';
import API from '../../api/API';
import getEnvVars from '../../environment';
const { websocketsUri } = getEnvVars();

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: '',
      currentUser: {},
      allUsers: [],
      allUsersById: [],
      directUsers: [],
      directChatMessages: {},
      channels: [],
      channelChatMessages: {}
    }
  };

  componentDidMount() {
    API.fetchAllUsers().then(users => {
      let usersById = {};

      for (let i = 0; i < users.length; i++) {
        usersById[users[i].id] = users[i];
      }

      this.setState({ allUsersById: usersById, allUsers: users });
    });

    API.getDirectsForCurrentUser().then(users => {
      this.setState({ directUsers: users });
    });

    API.getChannelsForCurrentUser().then(channels => {
      this.setState({ channels: channels });
    });

    API.getCurrentUser().then(user => {
      this.setState({ currentUser: user });
    });

    this._createWebSocket();
  }

  _createWebSocket = async () => {
    const ws = new WebSocket(websocketsUri);
    const userToken = await AsyncStorage.getItem('userToken');
    const that = this;

    ws.onmessage = function (event) {
      const message = JSON.parse(event.data),
        senderUserId = message.senderUserId,
        recipientChannelId = message.recipientChannelId,
        recipientUserId = message.recipientUserId,
        textMessage = message.textMessage;

      that.handleReceivedMessage({ senderUserId, recipientChannelId, recipientUserId, textMessage });
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
    if (message && message.textMessage) {
      if (message.recipientChannelId && message.senderUserId) {
        const fromUser = this.state.allUsersById[message.senderUserId];
        const textMessage = message.textMessage;
        const channelChatMessages = this.state.channelChatMessages;
        const messages = channelChatMessages[message.recipientChannelId] || [];

        messages.push({ fromUser, textMessage });
        channelChatMessages[message.recipientChannelId] = messages;

        this.setState({ channelChatMessages });
      } else if (message.recipientUserId && message.senderUserId) {
        const fromUser = this.state.allUsersById[message.senderUserId];
        const textMessage = message.textMessage;
        const directChatMessages = this.state.directChatMessages;

        if (this.state.currentUser.id == message.senderUserId) {
          const messages = directChatMessages[message.recipientUserId] || [];  
          messages.push({ fromUser, textMessage });
          directChatMessages[message.recipientUserId] = messages;
          this.setState({ directChatMessages });
        } else {
            const messages = directChatMessages[message.senderUserId] || [];  
            messages.push({ fromUser, textMessage });
            directChatMessages[message.senderUserId] = messages;
            this.setState({ directChatMessages });  
        }
      }
    }
  };

  handleSentMessage(message) {
    // do nothing
  };

  _signOut() {
    // TODO server side Signout too
    AsyncStorage.clear().then(() => {
      this.props.navigation.navigate('Auth');
    });
  }

  componentDidUpdate() {
    this.props.navigation.closeDrawer();
  }

  render() {
    const directUserId = this.props.navigation.getParam('directUserId');
    const directUserFullName = this.props.navigation.getParam('directUserFullName');
    const channelId = this.props.navigation.getParam('channelId');
    const channelName = this.props.navigation.getParam('channelName');

    let headerMessage = '';
    if (!this.state.currentUser) {
      this.props.navigation.navigate('Auth');
    }

    if (this.state.currentUser.fullName) {
      headerMessage = 'Welcome ' + this.state.currentUser.fullName + '!';
    }
    if (channelName) {
      headerMessage += ' Chat in Channel  ' + channelName;
    } else if (directUserFullName) {
      headerMessage += ' Chat with ' + directUserFullName;
    }

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <Header
          leftComponent={{ icon: 'menu', color: '#fff', onPress: this.props.navigation.toggleDrawer }}
          centerComponent={{ text: headerMessage, style: { color: '#fff' } }}
          rightComponent={{ text: 'Sign out', style: { color: '#fff' }, onPress: () => this._signOut() }}
        />
        <Text style={GlobalStyles.error}>{this.state.errorMessage}</Text>
        {this.state.directUsers.map((user, key) =>
          <ChatScreen
            show={user.id == directUserId}
            directUserId={user.id}
            channelId={null}
            currentUserId={this.state.currentUser.id}
            messages={this.state.directChatMessages[user.id] || []}
            onSend={(message) => this.handleSentMessage(message)}
            key={'user-chat-' + key}
          />)}
        {this.state.channels.map((channel, key) =>
          <ChatScreen
            show={channel.id == channelId}
            directUserId={null}
            channelId={channel.id}
            currentUserId={this.state.currentUser.id}
            messages={this.state.channelChatMessages[channel.id] || []}
            onSend={(message) => this.handleSentMessage(message)}
            key={'channel-chat-' + key}
          />)}
      </KeyboardAvoidingView>
    );
  }
}

export default HomeScreen
