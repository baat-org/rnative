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
      users: [],
      unreadCounts: {}
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
      const replyMessage = JSON.parse(event.data),
        senderUserId = replyMessage.senderUserId,
        textMessage = replyMessage.textMessage;

      if (senderUserId && textMessage) {
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

  render() {
    return (
      <SafeAreaView style={GlobalStyles.safeArea}>
        {this.state.users.map((user, key) =>
          <ListItem
            key={key}
            onPress={() => this.props.navigation.navigate('Home', { userId: user.id, fullName: user.fullName })}
            title={user.fullName}
            bottomDivider
          />)}
      </SafeAreaView>
    );
  }
}

export default SideMenuScreen
