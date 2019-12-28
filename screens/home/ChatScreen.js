import React from 'react';
import { Header } from 'react-native-elements';

class ChatScreen extends React.Component {
  render() {
    this.props.navigation.closeDrawer();

    return (
      <Header
        leftComponent={{ icon: 'menu', color: '#fff', onPress: this.props.navigation.toggleDrawer }}
        centerComponent={{ text: this.props.navigation.getParam('user'), style: { color: '#fff' } }}
      />
    );
  }
}

export default ChatScreen
