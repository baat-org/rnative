import React from 'react';
import { Header } from 'react-native-elements';
import { AsyncStorage, Text } from 'react-native';
import GlobalStyles from '../../GlobalStyles';
import { KeyboardAvoidingView } from 'react-native';
import ChatScreen from './ChatScreen';
import API from '../../api/API';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.chatScreens = {};
    this.state = {
      errorMessage: '',
    }
  };

  componentDidMount() {
    API.fetchAllUsers().then(users => {
      for (let i = 0; i < users.length; i++) {
        let user = users[i];
        this.chatScreens[user.id] = <ChatScreen userId={user.id} />;
      }
    });
  }

  _signOut() {
    AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  }

  render() {
    this.props.navigation.closeDrawer();

    const userId = this.props.navigation.getParam('userId');
    const fullName = this.props.navigation.getParam('fullName');
    const chatScreen = userId && this.chatScreens && this.chatScreens[userId] ? this.chatScreens[userId] : <Text>Please select user from side menu.</Text>;

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <Header
          leftComponent={{ icon: 'menu', color: '#fff', onPress: this.props.navigation.toggleDrawer }}
          centerComponent={{ text: fullName, style: { color: '#fff' } }}
          rightComponent={{ text: 'Sign out', style: { color: '#fff' }, onPress: () => this._signOut() }}
        />
        <Text style={GlobalStyles.error}>{this.state.errorMessage}</Text>
        {chatScreen}
      </KeyboardAvoidingView>
    );
  }
}

export default HomeScreen
