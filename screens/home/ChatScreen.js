import React from 'react';
import { Header } from 'react-native-elements';
import { AsyncStorage, View, Text, TextInput } from 'react-native';
import { ScrollView } from 'react-native';
import { GQL_API_URI } from 'react-native-dotenv';
import GlobalStyles from '../../GlobalStyles';

class ChatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
    }
  };

  componentDidMount() {
    this._loadChatPanels().then(chatPanels => {
      this.chatPanels = chatPanels;
    });
  }


  _loadChatPanels = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    const chatPanels = {};

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
            chatPanels[users[i].id] = <Text>{users[i].id}</Text>
          }
        }
      })
      .catch((error) => {
        this.setState({ errorMessage: error });
      });

      return chatPanels;
  };

  _signOut() {
    AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  }

  render() {
    this.props.navigation.closeDrawer();
    const recipientUserId = this.props.navigation.getParam('recipientUserId');
    const reciepientFullName = this.props.navigation.getParam('reciepientFullName');
    const chatPanel = recipientUserId && this.chatPanels && this.chatPanels[recipientUserId] ? this.chatPanels[recipientUserId] : <Text>Please select user from side menu.</Text>;

    return (
      <View style={{ flex: 1 }}>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff', onPress: this.props.navigation.toggleDrawer }}
          centerComponent={{ text: reciepientFullName, style: { color: '#fff' } }}
          rightComponent={{ text: 'Sign out', style: { color: '#fff' }, onPress: () => this._signOut() }}
        />
        <Text style={GlobalStyles.error}>{this.state.errorMessage}</Text>
        <ScrollView>
          {chatPanel}
        </ScrollView>
        <View>
          <TextInput multiline={true} numberOfLines={4} placeholder="Message" />
          <Text>Bottom</Text>
        </View>
      </View>
    );
  }
}

export default ChatScreen
