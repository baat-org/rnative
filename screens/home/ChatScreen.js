import React from 'react';
import { Button, View } from 'react-native';

class ChatScreen extends React.Component {
  componentDidMount() {
    this.props.navigation.openDrawer();
  }

  static navigationOptions = {
    drawerLabel: 'Chat',
  };
  render() {
    return (
      <View>
        <Button
          onPress={() => this.props.navigation.navigate('Members')}
          title="Members"
        />
      </View>
    );
  }
}

export default ChatScreen