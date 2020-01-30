import React from 'react';
import { SafeAreaView } from 'react-navigation';
import GlobalStyles from '../../GlobalStyles'
import { ListItem } from 'react-native-elements';
import API from '../../api/API';
import { WEBSOCKETS_URI } from 'react-native-dotenv';
import { AsyncStorage } from 'react-native';

class SideMenuScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUserId: null,
      users: [],
      hasUnreadMessage: {}
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
    const that = this;

    ws.onmessage = function (event) {
      const message = JSON.parse(event.data);

      if (message && message.senderUserId && message.textMessage) {
        that.state.hasUnreadMessage[message.senderUserId] = true;
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

  _onSelectUser(user) {
    this.state.hasUnreadMessage[user.id] = false;
    this.state.selectedUserId = user.id;
    this.props.navigation.navigate('Home', { userId: user.id, fullName: user.fullName })
  }

  render() {
    const selectedUserStyle = {},
      userWithUnreadMessageStyle = { fontWeight: 'bold' };
    return (
      <SafeAreaView style={GlobalStyles.safeArea}>
        {this.state.users.map((user, key) =>
          <ListItem
            key={key}
            onPress={() => this._onSelectUser(user)}
            title={user.fullName}
            leftAvatar={{ icon: { name: 'user', type: 'font-awesome' }, containerStyle: {marginRight: 1} }}
            titleStyle={this.state.selectedUserId == user.id ? selectedUserStyle : (this.state.hasUnreadMessage[user.id] ? userWithUnreadMessageStyle : {})}
            chevron
            bottomDivider
          />)}
      </SafeAreaView>
    );
  }
}

export default SideMenuScreen
