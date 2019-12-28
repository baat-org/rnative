import React from 'react';
import { Header } from 'react-native-elements';
import { AsyncStorage } from 'react-native';

class ChatScreen extends React.Component {
  signOut() {
    AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  }

  render() {
    this.props.navigation.closeDrawer();

    return (
      <Header
        leftComponent={{ icon: 'menu', color: '#fff', onPress: this.props.navigation.toggleDrawer }}
        centerComponent={{ text: this.props.navigation.getParam('user'), style: { color: '#fff' } }}
        rightComponent={{ text: 'Sign out', style: { color: '#fff' }, onPress: () => this.signOut() }}
      />
    );
  }
}

export default ChatScreen
