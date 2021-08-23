import React from 'react';
import { SafeAreaView } from 'react-navigation';
import GlobalStyles from '../../GlobalStyles'
import { ListItem } from 'react-native-elements';
import API from '../../api/API';
import { AsyncStorage } from 'react-native';
import getEnvVars from '../../environment';
const { websocketsUri } = getEnvVars();

class SideMenuScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDirectUserId: null,
      selectedChannelId: null,
      directUsers: [],
      channels: [],
      hasUnreadMessageForChannel: {},
      hasUnreadMessageForDirectUser: {}
    }
  };

  componentDidMount() {
    API.getDirectsForCurrentUser().then(users => {
      this.setState({ directUsers: users });
    });

    API.getChannelsForCurrentUser().then(channels => {
      this.setState({ channels: channels });
    });

    this._createWebSocket();
  }

  _createWebSocket = async () => {
    const ws = new WebSocket(websocketsUri);
    const userToken = await AsyncStorage.getItem('userToken');
    const that = this;

    ws.onmessage = function (event) {
      const message = JSON.parse(event.data);

      if (message && message.textMessage) {
        if (message.recipientChannelId) {
          that.state.hasUnreadMessageForChannel[message.recipientChannelId] = true;
        } else if (message.senderUserId) {
          that.state.hasUnreadMessageForDirectUser[message.senderUserId] = true;
        }
      }
    };

    ws.onclose = function () {
      console.log("Socket closed");
    };

    ws.onopen = function () {
      // TODO may want to do it as part of Connect
      ws.send(userToken);
      console.log("Connected Side Menu");
    };
  }

  _onSelectDirectUser(user) {
    this.state.hasUnreadMessageForDirectUser[user.id] = false;
    this.state.selectedDirectUserId = user.id;
    this.props.navigation.navigate('Home', { directUserId: user.id, directUserFullName: user.fullName, channelId: null, channelName: null })
  }

  _onSelectChannel(channel) {
    this.state.hasUnreadMessageForChannel[channel.id] = false;
    this.state.selectedChannelId = channel.id;
    this.props.navigation.navigate('Home', { directUserId: null, directUserFullName: null, channelId: channel.id, channelName: channel.name })
  }

  render() {
    // TODO Add avatar support

    const selectedStyle = {},
      unreadStyle = { fontWeight: 'bold' };
    return (
      <SafeAreaView style={GlobalStyles.safeArea}>
          <ListItem
            title="Directs"
            bottomDivider
          />
        {this.state.directUsers.map((user, key) =>
          <ListItem
            key={'user-side-menu-' + key}
            onPress={() => this._onSelectDirectUser(user)}
            title={user.fullName}
            // leftAvatar={{ icon: { name: 'user', type: 'font-awesome' }, containerStyle: { marginRight: 1 } }}
            titleStyle={this.state.selectedDirectUserId == user.id ? selectedStyle : (this.state.hasUnreadMessageForDirectUser[user.id] ? unreadStyle : {})}
            chevron
            bottomDivider
          />)}
          <ListItem
            title="Channels"
            bottomDivider
          />
        {this.state.channels.map((channel, key) =>
          <ListItem
            key={'channel-side-menu-' + key}
            onPress={() => this._onSelectChannel(channel)}
            title={channel.name}
            // leftAvatar={{ icon: { name: 'user', type: 'font-awesome' }, containerStyle: { marginRight: 1 } }}
            titleStyle={this.state.selectedChannelId == channel.id ? selectedStyle : (this.state.hasUnreadMessageForChannel[channel.id] ? unreadStyle : {})}
            chevron
            bottomDivider
          />)}
      </SafeAreaView>
    );
  }
}

export default SideMenuScreen
